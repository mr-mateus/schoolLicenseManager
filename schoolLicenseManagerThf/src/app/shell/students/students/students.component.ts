import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ThfTableColumn, ThfTableAction, ThfPageFilter, ThfPageAction, ThfDialogService } from '@totvs/thf-ui';
import { Student } from 'src/app/model/student';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { StudentService } from 'src/app/core/student.service';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { finalize, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @ViewChild(StudentEditComponent) studentEdit: StudentEditComponent;
  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.openForCreate }
  ];

  readonly filterSettings: ThfPageFilter = {
    action: this.filterStudentByName.bind(this),
    ngModel: 'studentNameFilter',
    placeholder: 'Nome do estudante',

  };

  readonly tableColumns: Array<ThfTableColumn> = [
    { property: 'enrollment', label: 'Matrícula' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'studentType', label: 'Tipo de estudante' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar aluno',
      action: this.openForEdit.bind(this),
      icon: 'thf-icon thf-icon-edit',

    },
    {
      label: 'Excluir',
      action: this.confirmStudentDelete.bind(this),
      icon: 'thf-icon thf-icon-delete'
    }
  ];

  private page = 0;

  private size = 10;

  private destroy: Subject<void> = new Subject();

  isLoading = false;

  studentNameFilter = '';

  studentPage: PageResponseEntity<Student> = { hasNext: false, items: [] };


  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private thfDialog: ThfDialogService) { }

  ngOnInit(): void {
    this.handleParams();
  }

  handleParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(queryParams => {
        if (queryParams.name) {
          this.findStudentByName(queryParams.name);
        } else {
          this.loadStudents();
        }
      });
  }

  loadStudents(page = this.page, size = this.size): void {
    this.startLoading();
    this.studentService.findAllPaging(page + '', size + '')
      .pipe(
        takeUntil(this.destroy),
        finalize(() => { this.stopLoading(); }))
      .subscribe(students => {
        this.studentPage.hasNext = students.hasNext;
        if (this.studentPage.items.length > 0) {
          this.studentPage.items = this.studentPage.items.concat(students.items);
        } else {
          this.studentPage.items = students.items;
        }
      });
  }

  filterStudentByName(filter = this.studentNameFilter): void {
    this.resetPage();
    this.startLoading();
    this.setStudentNameFilter(filter);
    this.studentService.findByNameContaining(filter, this.page, this.size)
      .pipe(finalize(() => { this.stopLoading(); }))
      .subscribe(students => {
        this.studentPage = students;
      });
  }

  findStudentByName(name: string) {
    this.studentNameFilter = name;
    this.filterStudentByName(this.studentNameFilter);
  }

  loadMore(): void {
    this.nextPage();
    if (this.studentNameFilter.trim() === '') {
      this.loadStudents();
    } else {
      this.studentService.findByNameContaining(this.studentNameFilter, this.page, this.size)
        .pipe(finalize(() => { this.stopLoading(); }))
        .subscribe(students => {
            this.studentPage.hasNext = students.hasNext;
            this.studentPage.items = this.studentPage.items.concat(students.items);
        });
    }
  }

  openForCreate(): void {
    this.studentEdit.openForCreate();
  }

  openForEdit(student: Student): void {
    this.studentEdit.openForEdit(student);
  }

  confirmStudentDelete(student: Student): void {
    this.thfDialog.confirm({
      title: 'Excluir',
      message: `Você deseja eliminar esse aluno?`,
      confirm: () => {
        this.deleteStudent(student);
      },
    });
  }

  deleteStudent(student: Student): void {
    this.studentService.delete(+student.enrollment)
      .pipe(
        finalize(() => this.stopLoading()),
        takeUntil(this.destroy))
      .subscribe(() => {
        this.resetPage();
        this.findStudentByName(student.name);
      });
  }

  setStudentNameFilter(name: string): void {
    this.studentNameFilter = name;
  }

  nextPage(): void {
    this.page += 1;
  }

  resetPage(): void {
    this.page = 0;
  }

  startLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    this.isLoading = false;
  }
}
