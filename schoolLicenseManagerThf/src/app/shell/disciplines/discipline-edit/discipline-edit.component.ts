import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfComboOption } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DisciplineService } from 'src/app/core/discipline.service';
import { Discipline } from 'src/app/model/discipline';
import { TeacherService } from 'src/app/core/teacher.service';

@Component({
  selector: 'app-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styleUrls: ['./discipline-edit.component.css']
})
export class DisciplineEditComponent implements OnInit, OnDestroy {
  @ViewChild(ThfModalComponent)
  private thfModal: ThfModalComponent;

  close: ThfModalAction = {
    action: () => {
      this.cancel();
    },
    label: 'Cancelar'
  };

  confirm: ThfModalAction = {
    action: () => {
      this.save();
    },
    label: 'Salvar'
  };

  @Output()
  disciplineCreated = new EventEmitter<Discipline>();

  disciplineForm = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    initials: ['', Validators.required],
    workload: ['', Validators.required],
    teacher: ['']
  });

  teacherOptions: Array<ThfComboOption> = new Array<ThfComboOption>();

  private destroy: Subject<void> = new Subject();

  constructor(
    private disciplineService: DisciplineService,
    private teacherService: TeacherService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.checkFormValid();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private findTeachers() {
    this.teacherService.findAll().subscribe(teachers => {
      teachers.forEach(teacher => {
        this.teacherOptions.push({ value: teacher.id, label: teacher.name });
      });
    });
  }

  openForCreate(): void {
    this.findTeachers();
    this.thfModal.open();
  }

  openForEdit(discipline: Discipline): void {
    this.findTeachers();
    this.setDisciplineForm(discipline);
    this.thfModal.open();
  }

  save(): void {
    const discipline = this.disciplineFormToStudent();
    if (discipline.id) {
      this.disciplineService.update(discipline)
        .pipe(takeUntil(this.destroy))
        .subscribe(disciplineCreated => {
          this.closeModal();
          this.disciplineCreated.emit(disciplineCreated);
        });
    } else {
      this.disciplineService.create(discipline)
        .pipe(takeUntil(this.destroy))
        .subscribe(disciplineCreated => {
          this.closeModal();
          this.disciplineCreated.emit(disciplineCreated);
        });
    }
  }

  cancel(): void {
    this.closeModal();
  }

  private closeModal() {
    this.thfModal.close();
    this.resetForm();
  }

  private checkFormValid(): void {
    this.disciplineForm.statusChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.confirm.disabled = this.disciplineForm.pristine || this.disciplineForm.invalid;
    });
  }

  private resetForm(): void {
    this.disciplineForm.reset();
    // this.studentForm.controls['studentType'].markAsPristine();
  }

  private setDisciplineForm(discipline: Discipline) {
    this.disciplineForm.patchValue({
      id: discipline.id,
      description: discipline.description,
      initials: discipline.initials,
      workload: discipline.workload
    });
    if (discipline.teacher) {
      this.disciplineForm.patchValue({ teacher: discipline.teacher.id });
    }
  }

  private disciplineFormToStudent(): any {
    const discipline = {
      id: this.disciplineForm.get('id').value,
      description: this.disciplineForm.get('description').value,
      initials: this.disciplineForm.get('initials').value,
      workload: this.disciplineForm.get('workload').value,
      teacher: null

      // teacher.id: this.disciplineForm.get('teacher').value,
    };
    if (this.disciplineForm.get('teacher').value) {
      discipline.teacher = {
        id: this.disciplineForm.get('teacher').value
      }
    }


    // const teacher = this.teacherOptions.find((t) => t.value === this.disciplineForm.get('teacher').value);
    // if (teacher) {
    //   discipline.teacher.id = +teacher.value;
    // }
    return discipline;
  }
}
