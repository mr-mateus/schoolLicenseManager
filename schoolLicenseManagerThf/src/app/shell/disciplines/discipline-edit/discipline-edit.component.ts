import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ThfModalComponent, ThfModalAction } from '@totvs/thf-ui';
import { DisciplineService } from 'src/app/core/discipline.service';
import { DisciplineFormComponent } from '../discipline-form/discipline-form.component';
import { Discipline } from 'src/app/model/discipline';

@Component({
  selector: 'app-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styleUrls: ['./discipline-edit.component.css']
})
export class DisciplineEditComponent implements OnInit {
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild(DisciplineFormComponent) disciplineFormComponent: DisciplineFormComponent;
  @Output() public disciplineCreated = new EventEmitter<Discipline>();

  close: ThfModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar'

  };

  confirm: ThfModalAction = {
    action: () => {
      this.processDiscipline();
    },
    label: 'Salvar'
  };

  constructor(private disciplineService: DisciplineService) { }

  ngOnInit() {
  }


  openForInsert(): void {
    this.thfModal.open();
  }

  openForUpdate(id: number): void {
    this.disciplineService.findById(id).subscribe(discipline => {
      this.disciplineFormComponent.showDisciplineForEdit(discipline);
      this.thfModal.open();
    });
  }

  closeModal() {
    this.disciplineFormComponent.disciplineForm.reset();
    this.thfModal.close();
  }

  processDiscipline() {
    this.disciplineFormComponent.save().subscribe(discipline => {
      this.closeModal();
      this.disciplineCreated.emit(discipline);
    });
  }

}
