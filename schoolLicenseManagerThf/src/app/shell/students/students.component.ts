import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/core/student.service';
import { ThfTableColumn, ThfPageAction, ThfPageFilter, ThfTableAction } from '@totvs/thf-ui';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { Student } from 'src/app/model/student';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  @ViewChild(StudentEditComponent) studentEditComponent: StudentEditComponent;

  public readonly columns: Array<ThfTableColumn> = [
    { property: 'enrollment', label: 'Matrícula' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'studentType', label: 'Tipo de estudante' }
  ];

  public readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar aluno',
      action: this.updateStudent.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteStudent.bind(this)
    }
  ];

  public readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.addStudent }
  ];

  public readonly filterSettings: ThfPageFilter = {
    action: 'filterStudentByName',
    ngModel: 'studentNameFilter',
    placeholder: 'Nome do estudante',

  };

  public studentNameFilter = '';
  public studentPage: PageResponseEntity<Student> = { hasNext: false, items: [] };
  public isLoading = false;
  private page = 0;
  private size = 10;
  constructor(private studentsService: StudentService) {

  }

  public ngOnInit() {
    this.findStudents();
  }

  public findStudents(): void {
    this.isLoading = true;
    this.studentsService.findAll(this.page + '', this.size + '').subscribe(students => {
      this.studentPage.hasNext = students.hasNext;
      if (this.studentPage.items.length > 0) {
        this.studentPage.items = this.studentPage.items.concat(students.items);
      } else {
        this.studentPage.items = students.items;
      }
    }, error => { },
      () => {
        this.isLoading = false;
      });
  }

  public filterStudentByName(filter = this.studentNameFilter) {
    this.page = 0;
    this.isLoading = true;
    this.studentsService.findByNameContaining(filter, this.page + '', this.size + '').subscribe(students => {
      this.studentPage = students;
    }, error => { },
      () => { this.isLoading = false; });
  }

  public findStudentByName(student: Student): void {
    this.studentNameFilter = student.name;
    this.filterStudentByName(this.studentNameFilter);
  }

  public findMore(): void {
    this.page += 1;
    this.findStudents();
  }

  public addStudent() {
    this.studentEditComponent.openForInsert();
  }

  public updateStudent(student: Student) {
    this.studentEditComponent.openForUpdate(student.enrollment);
  }

  public deleteStudent(student: Student) {
    this.studentsService.delete(student.enrollment).subscribe(() => {
      this.page = 0;
      this.isLoading = true;
      this.filterStudentByName('');
    }, error => {
      console.error(error);
    },
      () => {
        this.isLoading = false;
      }
    );
  }
}
