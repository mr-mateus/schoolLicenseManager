import { Component, OnInit, ViewChild } from '@angular/core';
import { DisciplineService } from 'src/app/core/discipline.service';
import { ThfPageAction, ThfPageFilter, ThfTableColumn, ThfTableAction } from '@totvs/thf-ui';
import { Discipline } from 'src/app/model/discipline';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {
  @ViewChild(DisciplineEditComponent) disciplineEditComponent: DisciplineEditComponent;
  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.addDiscipline }
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
      action: this.updateDiscipline.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteDiscipline.bind(this)
    }
  ];

  disciplinePage: PageResponseEntity<Discipline> = { hasNext: false, items: [] };
  disciplineInitialsFilter = '';
  isLoading = false;
  page = 0;
  size = 10;

  constructor(private disciplineService: DisciplineService) { }

  ngOnInit() {
    this.findDisciplines();
  }

  findDisciplines(): void {
    this.isLoading = true;
    this.disciplineService.findAll(this.page + '', this.size + '').subscribe(disciplines => {
      this.disciplinePage.hasNext = disciplines.hasNext;
      if (this.disciplinePage.items.length > 0) {
        this.disciplinePage.items = this.disciplinePage.items.concat(disciplines.items);
      } else {
        this.disciplinePage.items = disciplines.items;
      }
    }, error => { this.isLoading = false; },
      () => {

        this.isLoading = false;
      });
  }

  filterDisciplineByInitials(filter = this.disciplineInitialsFilter) {
    this.page = 0;
    this.isLoading = true;
    this.disciplineService.findByInitialsContaining(filter, this.page + '', this.size + '').subscribe(disciplines => {
      this.disciplinePage = disciplines;
    }, error => { },
      () => { this.isLoading = false; });
  }

  findDisciplineByInitials(discipline: Discipline): void {
    this.disciplineInitialsFilter = discipline.initials;
    this.filterDisciplineByInitials(this.disciplineInitialsFilter);
  }

  findMore(): void {
    this.page += 1;
    this.findDisciplines();
  }

  addDiscipline() {
    this.disciplineEditComponent.openForInsert();
  }

  updateDiscipline(discipline: Discipline) {
    this.disciplineEditComponent.openForUpdate(discipline.id);
  }

  deleteDiscipline(discipline: Discipline) {
    this.disciplineService.delete(discipline.id).subscribe(() => {
      this.page = 0;
      this.isLoading = true;
      this.disciplineInitialsFilter = '';
      this.filterDisciplineByInitials();
    }, error => {
      console.error(error);
    },
      () => {
        this.isLoading = false;
      }
    );

  }
}
