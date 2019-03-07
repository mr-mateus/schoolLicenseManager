import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/student.service';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.css']
})
export class SchoolClassesComponent implements OnInit {


  constructor(private studentService: StudentService) { }

  ngOnInit() {

  }

}
