import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/student.service';
import { ThfTableColumn, ThfPageAction } from '@totvs/thf-ui';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  public readonly columns: Array<ThfTableColumn> = [
    { property: 'enrollment', label: 'Código' },
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'Email' },
    { property: 'studentType', label: 'Tipo de estudante' }
  ];
  public readonly actions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.addStudent}
  ];
  // public students: Array<Student> = new Array<Student>();
  public students: Array<any> = new Array<any>();
  constructor(private studentsService: StudentService) {

  }

  ngOnInit() {
    this.students.push({ id: '1', name: 'João' });
    this.studentsService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  public addStudent() {

  }

}
