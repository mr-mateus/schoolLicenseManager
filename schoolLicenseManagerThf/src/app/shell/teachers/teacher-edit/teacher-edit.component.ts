import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  @Output() public teacherCreated = new EventEmitter<Teacher>();
  constructor() { }

  ngOnInit() {
  }

}
