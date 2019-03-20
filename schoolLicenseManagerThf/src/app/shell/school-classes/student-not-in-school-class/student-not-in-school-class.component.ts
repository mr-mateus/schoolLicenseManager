import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ThfModalComponent, ThfModalAction, ThfListViewAction, ThfListViewComponent } from '@totvs/thf-ui';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/core/student.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';

@Component({
  selector: 'app-student-not-in-school-class',
  templateUrl: './student-not-in-school-class.component.html',
  styleUrls: ['./student-not-in-school-class.component.css']
})
export class StudentNotInSchoolClassComponent implements OnInit {
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @Output()
  studentsSelected: EventEmitter<Array<Student>> = new EventEmitter<Array<Student>>();
  confirmStudentModal: ThfModalAction = {
    action: () => {
      this.addStudentsSelected();
    },
    label: 'Adicionar alunos'
  };

  cancelStudentModal: ThfModalAction = {
    action: () => {
      this.cancelAddStudentSelected();
    },
    label: 'Cancelar'
  };

  private page = 0;
  private size = 10;
  private studentsAlreadySelected = new Array<Student>();
  studentPage: PageResponseEntity<Student> = { hasNext: false, items: [] };

  constructor(private studentService: StudentService) {

  }
  ngOnInit(): void {
  }

  openToAddStudent(schoolClassStudents?: Array<Student>): void {
    this.studentsAlreadySelected = schoolClassStudents;
    if (!this.studentPage.items || this.studentPage.items.length === 0) {
      this.studentService.findAll(this.page, this.size).subscribe(students => {
        this.studentPage = students;
        if (schoolClassStudents && schoolClassStudents.length > 0) {
          this.studentPage.items.forEach(student => {
            schoolClassStudents.forEach(schoolClassStudent => {
              if (schoolClassStudent.enrollment === student.enrollment) {
                student['$selected'] = true;
                return;
              }
            });
          });
        }
        this.thfModal.open();
      });
    } else {
      this.studentsAlreadySelected.forEach(student => {
        this.studentPage.items.forEach(schoolClassStudent => {
          if (schoolClassStudent.enrollment === student.enrollment) {
            schoolClassStudent['$selected'] = true;
          }
        });
      });
      this.thfModal.open();
    }
  }

  loadMoreStudents(): void {
    this.page += 1;
    this.studentService.findAll(this.page, this.size).subscribe(students => {
      this.studentPage.hasNext = students.hasNext;
      this.studentPage.items = this.studentPage.items.concat(students.items);
      this.studentsAlreadySelected.forEach(student => {
        this.studentPage.items.forEach(schoolClassStudent => {
          if (schoolClassStudent.enrollment === student.enrollment) {
            schoolClassStudent['$selected'] = true;
          }
        });
      });
    });
  }

  addStudentsSelected(): void {
    let students = new Array<Student>();
    const studentPageIndexed = [];
    students = students.concat(this.studentPage.items.filter(student => {
      studentPageIndexed[student.enrollment] = student;
      return student['$selected'] === true;
    }));

    students = students.concat(this.studentsAlreadySelected.filter(studentAlreadySelected => {
      return !studentPageIndexed[studentAlreadySelected.enrollment];
    }));

    students.forEach(student => {
      delete student['$selected'];
    });
    this.studentsSelected.emit(students);
    this.thfModal.close();
  }

  cancelAddStudentSelected(): void {
    this.close();
  }

  close(): void {
    this.thfModal.close();
  }

}
