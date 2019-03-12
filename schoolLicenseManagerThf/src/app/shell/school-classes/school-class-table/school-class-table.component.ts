import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThfTableColumn, ThfTableAction } from '@totvs/thf-ui';
import { SchoolClass } from 'src/app/model/schoolClass';

@Component({
  selector: 'app-school-class-table',
  templateUrl: './school-class-table.component.html',
  styleUrls: ['./school-class-table.component.css']
})
export class SchoolClassTableComponent implements OnInit {
  public readonly columns: Array<ThfTableColumn> = [
    { property: 'id', label: 'Código', },
    { property: 'description', label: 'Descrição' },
    { property: 'year', label: 'Ano' },
    { property: 'period', label: 'Período Letivo' },
    { property: 'vacancies', label: 'Vagas' },
    { property: 'addStudent', type: 'icon',  },
  ];

  public readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar Turma',
      action: this.updateSchoolClass.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteSchoolClass.bind(this)
    }
  ];

  @Input() schoolClasses: Array<SchoolClass>;
  @Input() hasNext = false;
  @Input() isLoading = false;
  @Output() findMoreEvent = new EventEmitter<void>();
  @Output() updateSchoolClassEvent = new EventEmitter<SchoolClass>();
  @Output() deleteSchoolClassEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {

  }

  findMore() {
    this.findMoreEvent.emit();
  }

  updateSchoolClass(schoolClass: SchoolClass) {
    this.updateSchoolClassEvent.emit(schoolClass);
  }

  deleteSchoolClass(schoolClass: SchoolClass) {
    this.deleteSchoolClassEvent.emit(schoolClass.id);
  }

}
