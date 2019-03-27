import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThfModalAction, ThfModalComponent, ThfPageAction, ThfTableAction, ThfTableColumn, ThfDisclaimer } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { SchoolClassService } from 'src/app/core/school-class.service';
import { StudentService } from 'src/app/core/student.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { SchoolClass } from 'src/app/model/schoolClass';
import { Student } from 'src/app/model/student';
import { StudentNotInSchoolClassComponent } from '../student-not-in-school-class/student-not-in-school-class.component';
import { DisciplineNotInSchoolClassComponent } from '../discipline-not-in-school-class/discipline-not-in-school-class.component';
import { Discipline } from 'src/app/model/discipline';
import { StudentEditComponent } from '../../students/student-edit/student-edit.component';
import { DisciplineEditComponent } from '../../disciplines/discipline-edit/discipline-edit.component';

@Component({
  selector: 'app-school-class-edit',
  templateUrl: './school-class-edit.component.html',
  styleUrls: ['./school-class-edit.component.css']
})
export class SchoolClassEditComponent implements OnInit, OnDestroy {
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild(StudentNotInSchoolClassComponent) studentNotInSchoolClass: StudentNotInSchoolClassComponent;
  @ViewChild(DisciplineNotInSchoolClassComponent) disciplineNotInSchoolClass: DisciplineNotInSchoolClassComponent;
  @ViewChild(StudentEditComponent) studentEdit: StudentEditComponent;
  @ViewChild(DisciplineEditComponent) disciplineEdit: DisciplineEditComponent;

  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.openForCreate }
  ];

  readonly tableColumns: Array<ThfTableColumn> = [
    { property: 'enrollment', label: 'Matrícula' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'studentType', label: 'Tipo de estudante' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Remover',
      action: this.removeStudent.bind(this),
      icon: 'thf-icon thf-icon-delete'
    }
  ];

  schoolClassForm = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    year: ['', Validators.required],
    period: ['', Validators.required],
    vacancies: ['', Validators.required],
    remainingVacancies: [''],
    students: [[]],
    disciplines: [[]]
  });

  private destroy: Subject<void> = new Subject();

  @Output()
  schoolClassCreated = new EventEmitter<SchoolClass>();

  studentPage: PageResponseEntity<Student> = { hasNext: false, items: [] };

  constructor(
    private schoolClassService: SchoolClassService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.handleParams();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  handleParams() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.openForEdit(params.id);
      } else {
        this.openForCreate();
      }
    });
  }

  openForCreate(): void {
  }

  openForEdit(id: number): void {
    this.schoolClassService.findById(id)
      .pipe(
        takeUntil(this.destroy))
      .subscribe(schoolClass => {
        this.setSchoolClassForm(schoolClass);
      });
  }

  openToAddStudent(): void {
    const students = this.schoolClassForm.controls['students'].value as Array<Student>;
    this.studentNotInSchoolClass.openToAddStudent(students);
  }

  openToAddDiscipline(): void {
    const disciplineDisclaimers = this.schoolClassForm.controls['disciplines'].value as Array<ThfDisclaimer>;
    let disciplines = [];
    if (disciplineDisclaimers && disciplineDisclaimers.length > 0) {
      disciplines = disciplineDisclaimers.map(disciplineDisclaimer => {
        return disciplineDisclaimer.value;
      });
    }
    this.disciplineNotInSchoolClass.openToAddDiscipline(disciplines);
  }

  addCreatedDiscipline(discipline: Discipline) {
    const disciplinesForm = this.schoolClassForm.controls['disciplines'].value as Array<ThfDisclaimer>;
    const disclaimer: ThfDisclaimer = {
      label: discipline.initials,
      value: discipline
    };
    disciplinesForm.push(disclaimer);
    this.schoolClassForm.patchValue({
      disciplines: disciplinesForm
    })
  }

  createDiscipline(): void {
    this.disciplineEdit.openForCreate();
  }


  addStudentsSelected(studentsSelected: Array<Student>): void {
    this.schoolClassForm.patchValue({
      students: studentsSelected
    });
  }

  addCreatedStudent(student: Student): void {
    const studentsForm = this.schoolClassForm.controls['students'].value as Array<Student>;
    studentsForm.push(student);
    this.schoolClassForm.patchValue({
      students: studentsForm
    });
    this.disciplineNotInSchoolClass.resetComponent();
  }

  createStudent(): void {
    this.studentEdit.openForCreate();
  }

  addDisciplinesSelected(disciplinesSelected: Array<Discipline>): void {
    let disclaimers = [];
    if (disciplinesSelected && disciplinesSelected.length > 0) {
      disclaimers = disciplinesSelected.map<ThfDisclaimer>(discipline => {
        const disclaimer: ThfDisclaimer = {
          label: discipline.initials,
          value: discipline
        };
        return disclaimer;
      });
    }
    this.schoolClassForm.patchValue({
      disciplines: disclaimers
    });
  }

  getSchoolClassDisciplines(): Array<ThfDisclaimer> {
    return undefined;
  }

  removeDiscipline(): void {
    console.log('opa');
  }

  cancelAddStudentSelected(): void {
    this.thfModal.close();
    console.log('cancel');
  }

  removeStudent(studentRemoved: Student): void {
    let schoolClassStudents = this.schoolClassForm.controls['students'].value;
    schoolClassStudents = schoolClassStudents.filter(student => {
      return studentRemoved.enrollment !== student.enrollment;
    });
    this.schoolClassForm.patchValue({
      students: schoolClassStudents
    });
  }

  save(): void {
    const schoolClass = this.getSchoolClassFromForm();
    if (schoolClass.id) {
      this.schoolClassService.update(schoolClass)
        .pipe(takeUntil(this.destroy))
        .subscribe(schoolClassCreated => {
          this.schoolClassCreated.emit(schoolClassCreated);
          this.router.navigate(['schoolClasses'], { queryParams: { description: schoolClassCreated.description } });
        });
    } else {
      this.schoolClassService.create(schoolClass)
        .pipe(takeUntil(this.destroy))
        .subscribe(schoolClassCreated => {
          this.schoolClassCreated.emit(schoolClassCreated);
          this.router.navigate(['schoolClasses'], { queryParams: { description: schoolClassCreated.description } });
        });
    }
  }

  cancel(): void {
    this.router.navigate(['schoolClasses']);
  }

  private setSchoolClassForm(schoolClass: SchoolClass) {
    this.schoolClassForm.patchValue({
      id: schoolClass.id,
      description: schoolClass.description,
      period: schoolClass.period,
      year: schoolClass.year,
      vacancies: schoolClass.vacancies,
      remainingVacancies: schoolClass.remainingVacancies,
      students: schoolClass.students
    });
    this.addDisciplinesSelected(schoolClass.disciplines);
  }

  private getSchoolClassFromForm(): SchoolClass {
    const schoolClass: SchoolClass = {
      description: this.schoolClassForm.get('description').value,
      period: this.schoolClassForm.get('period').value,
      vacancies: this.schoolClassForm.get('vacancies').value,
      remainingVacancies: this.schoolClassForm.get('remainingVacancies').value,
      year: this.schoolClassForm.get('year').value,
    };
    schoolClass.id = this.schoolClassForm.get('id').value;
    schoolClass.students = this.schoolClassForm.get('students').value;
    const disciplineDisclaimers = this.schoolClassForm.get('disciplines').value;
    if (disciplineDisclaimers && disciplineDisclaimers.length > 0) {
      const disciplines = disciplineDisclaimers.map(disciplineDisclaimer => {
        return disciplineDisclaimer.value;
      });
      schoolClass.disciplines = disciplines;
    }

    return schoolClass;

  }
}
