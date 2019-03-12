import { Component, OnInit } from '@angular/core';
import { SchoolClassService } from 'src/app/core/school-class.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { SchoolClass } from 'src/app/model/schoolClass';
import { ThfPageFilter, ThfPageAction } from '@totvs/thf-ui';

@Component({
  selector: 'app-school-class-list',
  templateUrl: './school-class-list.component.html',
  styleUrls: ['./school-class-list.component.css']
})
export class SchoolClassListComponent implements OnInit {
  public readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.addSchoolClass }
  ];

  public readonly filterSettings: ThfPageFilter = {
    action: 'filterSchoolClassByDescription',
    ngModel: 'schoolClassDescriptionFilter',
    placeholder: 'Descrição da turma',

  };

  schoolClassPage: PageResponseEntity<SchoolClass> = { hasNext: false, items: [] };
  schoolClassDescriptionFilter = '';
  isLoading = false;
  private page = 0;
  private size = 10;
  constructor(private schoolClassService: SchoolClassService) { }

  ngOnInit() {
    this.findSchoolClasses();
  }

  findSchoolClasses() {
    this.isLoading = true;
    this.schoolClassService.findAll(this.page + '', this.size + '').subscribe(students => {
      this.schoolClassPage.hasNext = students.hasNext;
      if (this.schoolClassPage.items.length > 0) {
        this.schoolClassPage.items = this.schoolClassPage.items.concat(students.items);
      } else {
        this.schoolClassPage.items = students.items;
      }
    }, error => { },
      () => {
        this.isLoading = false;
      });
  }

  filterSchoolClassByDescription(filter = this.schoolClassDescriptionFilter) {
    this.page = 0;
    this.isLoading = true;
    this.schoolClassService.findByDescriptionContaining(filter, this.page + '', this.size + '').subscribe(schoolClasses => {
      this.schoolClassPage = schoolClasses;
    }, error => { },
      () => { this.isLoading = false; });
  }

  findStudentByName(schoolClass: SchoolClass): void {
    this.schoolClassDescriptionFilter = schoolClass.description;
    this.filterSchoolClassByDescription(this.schoolClassDescriptionFilter);
  }

  findMore(): void {
    this.page += 1;
    this.findSchoolClasses();
  }

  addSchoolClass() {

  }

}
