import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThfPageAction, ThfPageFilter, ThfTableAction, ThfTableColumn } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { Teacher } from 'src/app/model/teacher';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { TeacherService } from 'src/app/core/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html'
})
export class TeachersComponent implements OnInit, OnDestroy {

  @ViewChild(TeacherEditComponent) teacherEditComponent: TeacherEditComponent;

  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.openForCreate }
  ];

  readonly filterSettings: ThfPageFilter = {
    action: 'filterTeacherByName',
    ngModel: 'teacherNameFilter',
    placeholder: 'Nome do professor',
  };

  readonly tablecolumns: Array<ThfTableColumn> = [
    { property: 'id', label: 'Código' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'academicDegree', label: 'Titulação' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar professor',
      action: this.openForEdit.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteTeacher.bind(this)
    }
  ];

  private destroy: Subject<void> = new Subject();

  private page = 0;

  private size = 10;

  isLoading = false;

  teacherNameFilter = '';

  teacherPage: PageResponseEntity<Teacher> = { hasNext: false, items: [] };

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.handleParams();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  handleParams() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(queryParams => {
        if (queryParams.name) {
          this.filterTeacherByName(queryParams.name);
        } else {
          this.loadTeachers();
        }
      });
  }

  loadTeachers(): void {
    this.startLoading();
    this.teacherService.findAllPaging(this.page + '', this.size + '')
      .pipe(
        finalize(() => this.stopLoading()),
        takeUntil(this.destroy))
      .subscribe(teachers => {
        this.teacherPage.hasNext = teachers.hasNext;
        this.teacherPage.items =
          (this.teacherPage.items && this.teacherPage.items.length > 0) ? this.teacherPage.items.concat(teachers.items)
            : teachers.items;
      });
  }

  filterTeacherByName(filter = this.teacherNameFilter) {
    this.resetPage();
    this.setTeacherNameFilter(filter);
    this.startLoading();
    this.teacherService.findByNameContaining(filter, this.page + '', this.size + '')
      .pipe(
        finalize(() => this.stopLoading()),
        takeUntil(this.destroy))
      .subscribe(teachers =>
        this.teacherPage = teachers
      );
  }

  findTeacherByName(name: string): void {
    this.filterTeacherByName(name);
  }

  openForCreate() {
    this.teacherEditComponent.openForInsert();
  }

  openForEdit(teacher: Teacher) {
    this.teacherEditComponent.openForEdit(teacher);
  }

  loadMore(): void {
    this.nextPage();
    if (this.teacherNameFilter.trim() === '') {
      this.loadTeachers();
    } else {
      this.teacherService.findByNameContaining(this.teacherNameFilter, this.page + '', this.size + '')
        .pipe(finalize(() => { this.stopLoading(); }))
        .subscribe(teachers => {
          this.teacherPage.hasNext = teachers.hasNext;
          this.teacherPage.items = this.teacherPage.items.concat(teachers.items);
        });
    }
  }

  deleteTeacher(teacher: Teacher) {
    this.startLoading();
    this.teacherService.delete(teacher.id)
      .pipe(
        finalize(() => this.stopLoading()),
        takeUntil(this.destroy))
      .subscribe(() => {
        this.resetPage();
        this.filterTeacherByName(teacher.name);
      });
  }

  setTeacherNameFilter(name: string) {
    this.teacherNameFilter = name;
  }

  nextPage(): void {
    this.page += 1;
  }

  resetPage(): void {
    this.page = 0;
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
