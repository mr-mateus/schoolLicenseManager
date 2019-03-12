import { Component, OnInit, ViewChild } from '@angular/core';
import { ThfPageAction, ThfTableColumn, ThfTableAction, ThfPageFilter } from '@totvs/thf-ui';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/core/teacher.service';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html'
})
export class TeachersComponent implements OnInit {
  @ViewChild(TeacherEditComponent) teacherEditComponent: TeacherEditComponent;

  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.addTeacher }
  ];

  readonly filterSettings: ThfPageFilter = {
    action: 'filterTeacherByName',
    ngModel: 'teacherNameFilter',
    placeholder: 'Nome do professor',
  };

  readonly columns: Array<ThfTableColumn> = [
    { property: 'id', label: 'Código' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'academicDegree', label: 'Titulação' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar professor',
      action: this.updateTeacher.bind(this)
    },
    {
      label: 'Excluir',
      action: this.deleteTeacher.bind(this)
    }
  ];

  teacherPage: PageResponseEntity<Teacher> = { hasNext: false, items: [] };
  teacherNameFilter = '';

  isLoading = false;

  private page = 0;
  private size = 10;

  constructor(private teacherService: TeacherService) {

  }

  ngOnInit(): void {
    this.findTeachers();
  }

  findTeachers(): void {
    this.isLoading = true;
    this.teacherService.findAllPaging(this.page + '', this.size + '').subscribe(teachers => {
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
  }

  filterTeacherByName(filter = this.teacherNameFilter) {
    this.page = 0;
    this.isLoading = true;
    this.teacherService.findByNameContaining(filter, this.page + '', this.size + '').subscribe(teachers => {
      this.teacherPage = teachers;
    }, error => { },
      () => { this.isLoading = false; });
  }

  findTeacherByName(teacher: Teacher): void {
    this.teacherNameFilter = teacher.name;
    this.filterTeacherByName(this.teacherNameFilter);
  }

  addTeacher() {
    this.teacherEditComponent.openForInsert();
  }

  updateTeacher(teacher: Teacher) {
    this.teacherEditComponent.openForUpdate(teacher.id);
  }

  findMore(): void {
    this.page += 1;
    this.findTeachers();
  }

  deleteTeacher(teacher: Teacher) {
    this.teacherService.delete(teacher.id).subscribe(() => {
      this.page = 0;
      this.isLoading = true;
      this.teacherNameFilter = '';
      this.filterTeacherByName();
    }, error => {
      console.error(error);
    },
      () => {
        this.isLoading = false;
      }
    );
  }
}
