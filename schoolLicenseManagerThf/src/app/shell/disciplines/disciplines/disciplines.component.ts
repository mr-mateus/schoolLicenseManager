import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DisciplineService } from 'src/app/core/discipline.service';
import { ThfPageAction, ThfPageFilter, ThfTableColumn, ThfTableAction } from '@totvs/thf-ui';
import { Discipline } from 'src/app/model/discipline';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { DisciplineEditComponent } from '../discipline-edit/discipline-edit.component';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit, OnDestroy {
  @ViewChild(DisciplineEditComponent) disciplineEditComponent: DisciplineEditComponent;
  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.openForCreate }
  ];

  readonly filterSettings: ThfPageFilter = {
    action: 'filterDisciplineByInitials',
    ngModel: 'disciplineInitialsFilter',
    placeholder: 'Nome do professor',

  };

  readonly columns: Array<ThfTableColumn> = [
    { property: 'id', label: 'Código' },
    { property: 'initials', label: 'Sigla' },
    { property: 'description', label: 'Descrição' },
    { property: 'workload', label: 'Carga Horária' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar disciplina',
      action: this.openForEdit.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteDiscipline.bind(this)
    }
  ];

  private page = 0;

  private size = 10;

  private destroy: Subject<void> = new Subject();

  isLoading = false;

  disciplineInitialsFilter = '';

  disciplinePage: PageResponseEntity<Discipline> = { hasNext: false, items: [] };


  constructor(private disciplineService: DisciplineService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.handleParams();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  handleParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(queryParams => {
        if (queryParams.name) {
          this.findDisciplineByInitials(queryParams.name);
        } else {
          this.loadStudents();
        }
      });
  }

  loadStudents(page = this.page, size = this.size): void {
    this.startLoading();
    this.disciplineService.findAll(page + '', size + '')
      .pipe(
        takeUntil(this.destroy),
        finalize(() => { this.stopLoading(); }))
      .subscribe(disciplines => {
        this.disciplinePage.hasNext = disciplines.hasNext;
        if (this.disciplinePage.items.length > 0) {
          this.disciplinePage.items = this.disciplinePage.items.concat(disciplines.items);
        } else {
          this.disciplinePage.items = disciplines.items;
        }
      });
  }

  filterDisciplineByInitials(filter = this.disciplineInitialsFilter): void {
    this.resetPage();
    this.startLoading();
    this.disciplineService.findByInitialsContaining(filter, this.page + '', this.size + '')
      .pipe(finalize(() => { this.stopLoading(); }))
      .subscribe(disciplines => {
        this.disciplinePage = disciplines;
      });
  }

  findDisciplineByInitials(initials: string) {
    this.disciplineInitialsFilter = initials;
    this.filterDisciplineByInitials(this.disciplineInitialsFilter);
  }

  loadMore(): void {
    this.nextPage();
    this.loadStudents();
  }

  openForCreate(): void {
    this.disciplineEditComponent.openForCreate();
  }

  openForEdit(discipline: Discipline): void {
    this.disciplineEditComponent.openForEdit(discipline);
  }

  deleteDiscipline(discipline: Discipline): void {
    this.disciplineService.delete(discipline.id)
      .subscribe(() => {
        this.resetPage();
        this.findDisciplineByInitials(discipline.initials);
      });
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
