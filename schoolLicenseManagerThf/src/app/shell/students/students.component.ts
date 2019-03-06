import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/student.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {

  constructor(private studentsService: StudentService){

  }

  ngOnInit(): void {
    this.studentsService.getStudents();
  }

}
