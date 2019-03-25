import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ThfModalComponent, ThfModalAction } from '@totvs/thf-ui';
import { Student } from 'src/app/model/student';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { StudentService } from 'src/app/core/student.service';
import { Discipline } from 'src/app/model/discipline';
import { DisciplineService } from 'src/app/core/discipline.service';

@Component({
  selector: 'app-discipline-not-in-school-class',
  templateUrl: './discipline-not-in-school-class.component.html',
  styleUrls: ['./discipline-not-in-school-class.component.css']
})
export class DisciplineNotInSchoolClassComponent implements OnInit {
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @Output()
  disciplinesSelected: EventEmitter<Array<Discipline>> = new EventEmitter<Array<Discipline>>();
  confirmDisciplineModal: ThfModalAction = {
    action: () => {
      this.addDisciplineSelected();
    },
    label: 'Adicionar Disciplinas'
  };

  cancelDisciplineModal: ThfModalAction = {
    action: () => {
      this.cancelAddDisciplineSelected();
    },
    label: 'Cancelar'
  };

  private page = 0;
  private size = 10;
  private disciplineAlreadySelected = new Array<Discipline>();
  disciplinePage: PageResponseEntity<Discipline> = { hasNext: false, items: [] };

  constructor(private disciplineService: DisciplineService) {

  }

  ngOnInit(): void {
  }

  openToAddDiscipline(schoolClassDisciplines?: Array<Discipline>): void {
    this.disciplineAlreadySelected = schoolClassDisciplines;
    if (!this.disciplinePage.items || this.disciplinePage.items.length === 0) {
      this.disciplineService.findAllPaging(this.page + '', this.size + '').subscribe(students => {
        this.disciplinePage = students;
        if (schoolClassDisciplines && schoolClassDisciplines.length > 0) {
          this.disciplinePage.items.forEach(discipline => {
            schoolClassDisciplines.forEach(schoolClassStudent => {
              if (schoolClassStudent.id === discipline.id) {
                discipline['$selected'] = true;
                return;
              }
            });
          });
        }
        this.thfModal.open();
      });
    } else {
      this.disciplineAlreadySelected.forEach(student => {
        this.disciplinePage.items.forEach(schoolClassDiscipline => {
          if (schoolClassDiscipline.id === student.id) {
            schoolClassDiscipline['$selected'] = true;
          }
        });
      });
      this.thfModal.open();
    }
  }

  loadMoreDisciplines(): void {
    this.page += 1;
    this.disciplineService.findAllPaging(this.page + '', this.size + '').subscribe(students => {
      this.disciplinePage.hasNext = students.hasNext;
      this.disciplinePage.items = this.disciplinePage.items.concat(students.items);
      this.disciplineAlreadySelected.forEach(student => {
        this.disciplinePage.items.forEach(schoolClassStudent => {
          if (schoolClassStudent.id === student.id) {
            schoolClassStudent['$selected'] = true;
          }
        });
      });
    });
  }

  addDisciplineSelected(): void {
    let disciplines = new Array<Discipline>();
    const disciplinePageIndexed = [];
    disciplines = disciplines.concat(this.disciplinePage.items.filter(discipline => {
      disciplinePageIndexed[discipline.id] = discipline;
      return discipline['$selected'] === true;
    }));

    disciplines = disciplines.concat(this.disciplineAlreadySelected.filter(disciplineAlreadySelected => {
      return !disciplinePageIndexed[disciplineAlreadySelected.id];
    }));

    disciplines.forEach(discipline => {
      delete discipline['$selected'];
    });
    this.disciplinesSelected.emit(disciplines);
    this.thfModal.close();
  }

  cancelAddDisciplineSelected(): void {
    this.close();
  }

  close(): void {
    this.thfModal.close();
  }

  resetComponent(): void {
    this.page = 0;
    this.size = 10;
    this.disciplineAlreadySelected = new Array<Discipline>();
    this.disciplinePage = { hasNext: false, items: [] };
  }

}
