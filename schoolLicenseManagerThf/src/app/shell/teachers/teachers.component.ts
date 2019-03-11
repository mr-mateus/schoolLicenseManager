import { Component, OnInit } from '@angular/core';
import { ThfPageAction, ThfTableColumn, ThfTableAction, ThfPageFilter } from '@totvs/thf-ui';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/core/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html'
})
export class TeachersComponent implements OnInit {
  public readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.addTeacher }
  ];

  public readonly columns: Array<ThfTableColumn> = [
    { property: 'id', label: 'Código' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'academicDegree', label: 'Titulação' }
  ];

  public readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar professor',
      action: this.updateTeacher.bind(this)
    },
    {
      label: 'Excluir'
    }
  ];

  public readonly filterSettings: ThfPageFilter = {
    action: 'filterTeacherByName',
    ngModel: 'teacherNameFilter',
    placeholder: 'Nome do professor',

  };

  public teacherPage: PageResponseEntity<Teacher> = { hasNext: false, items: [] };
  public teacherNameFilter = '';

  public isLoading = false;
  private page = 0;
  private size = 10;

  constructor(private teacherService: TeacherService) {

  }
  ngOnInit(): void {
    this.findTeachers();
  }

  findTeachers(): void {
    this.isLoading = true;
    this.teacherService.findAll(this.page + '', this.size + '').subscribe(teachers => {
      this.teacherPage.hasNext = teachers.hasNext;
      if (this.teacherPage.items.length > 0) {
        this.teacherPage.items = this.teacherPage.items.concat(teachers.items);
      } else {
        this.teacherPage.items = teachers.items;
      }
    }, error => { },
      () => {
        this.isLoading = false;
      });
  };



  public filterTeacherByName(filter = this.teacherNameFilter) {
    this.page = 0;
    this.isLoading = true;
    this.teacherService.findByNameContaining(filter, this.page + '', this.size + '').subscribe(teachers => {
      this.teacherPage = teachers;
    }, error => { },
      () => { this.isLoading = false; });
  }

  addTeacher() {

  }

  updateTeacher() {

  }

  public findMore(): void {
    this.page += 1;
    this.findTeachers();
  }

}
