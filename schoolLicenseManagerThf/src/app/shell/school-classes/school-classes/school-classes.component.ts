import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThfPageAction, ThfPageFilter, ThfTableAction, ThfTableColumn } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { SchoolClassService } from 'src/app/core/school-class.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { SchoolClass } from 'src/app/model/schoolClass';
import { Teacher } from 'src/app/model/teacher';
import { TeacherEditComponent } from '../../teachers/teacher-edit/teacher-edit.component';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.css']
})
export class SchoolClassesComponent implements OnInit, OnDestroy {
  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.openForCreate }
  ];

  readonly filterSettings: ThfPageFilter = {
    action: 'filterSchoolClassByDescription',
    ngModel: 'schoolClassDescriptionFilter',
    placeholder: 'Descrição da turma',
  };

  readonly tableColumns: Array<ThfTableColumn> = [
    { property: 'id', label: 'Código' },
    { property: 'description', label: 'Descrição' },
    { property: 'year', label: 'Ano' },
    { property: 'period', label: 'Período' },
    { property: 'vacancies', label: 'Vagas' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar turma',
      action: this.openForEdit.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteSchoolClass.bind(this)
    }
  ];

  private destroy: Subject<void> = new Subject();

  private page = 0;

  private size = 10;

  isLoading = false;

  schoolClassDescriptionFilter = '';

  schoolClassPage: PageResponseEntity<SchoolClass> = { hasNext: false, items: [] };

  constructor(
    private schoolClassService: SchoolClassService,
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
        if (queryParams.description) {
          this.filterSchoolClassByDescription(queryParams.description);
        } else {
          this.loadTeachers();
        }
      });
  }

  loadTeachers(): void {
    this.startLoading();
    this.schoolClassService.findAll(this.page + '', this.size + '')
      .pipe(
        finalize(() => this.stopLoading()),
        takeUntil(this.destroy))
      .subscribe(teachers => {
        this.schoolClassPage.hasNext = teachers.hasNext;
        if (this.schoolClassPage.items.length > 0) {
          this.schoolClassPage.items = this.schoolClassPage.items.concat(teachers.items);
        } else {
          this.schoolClassPage.items = teachers.items;
        }
      });
  }

  filterSchoolClassByDescription(filter = this.schoolClassDescriptionFilter) {
    this.resetPage();
    this.setSchoolClassDescriptionFilter(filter);
    this.startLoading();
    this.schoolClassService.findByDescriptionContaining(filter, this.page + '', this.size + '')
      .pipe(
        finalize(() => this.stopLoading()),
        takeUntil(this.destroy))
      .subscribe(teachers =>
        this.schoolClassPage = teachers
      );
  }

  findTeacherByName(name: string): void {
    this.setSchoolClassDescriptionFilter(name);
    this.filterSchoolClassByDescription(name);
  }

  openForCreate() {
    this.router.navigate(['schoolClass'], { relativeTo: this.activatedRoute });
  }

  openForEdit(schoolClass: SchoolClass) {
    this.router.navigate([`schoolClass/${schoolClass.id}`], { relativeTo: this.activatedRoute });
  }

  findMore(): void {
    this.nextPage();
    this.loadTeachers();
  }

  deleteSchoolClass(schoolClass: SchoolClass) {
    this.startLoading();
    this.schoolClassService.delete(schoolClass.id)
      .pipe(
        finalize(() => this.stopLoading),
        takeUntil(this.destroy))
      .subscribe(() => {
        this.resetPage();
        this.filterSchoolClassByDescription(schoolClass.description);
      });
  }

  setSchoolClassDescriptionFilter(description: string) {
    this.schoolClassDescriptionFilter = description;
  }

  clearSchoolClassDescriptionFilter(): void {
    this.schoolClassDescriptionFilter = '';
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
