import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThfRadioGroupOption } from '@totvs/thf-ui';
import { StudentType, Student } from 'src/app/model/student';
import { StudentService } from 'src/app/core/student.service';
import { Observable } from 'rxjs';
import { FormUtil } from 'src/app/core/formUtil';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm = this.fb.group({
    enrollment: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required],
    studentType: ['', Validators.required],
  });

  readonly studentTypeOptions: Array<ThfRadioGroupOption> = [
    { label: 'ENADE', value: 1 },
    { label: 'VESTIBULAR', value: 2 }
  ];

  constructor(private fb: FormBuilder, private studentService: StudentService) {
  }

  ngOnInit(): void {
  }

  showStudentForEdit(student: Student) {

    this.studentForm.patchValue({
      enrollment: student.enrollment,
      name: student.name,
      cpf: student.cpf,
      email: student.email,
      studentType: student.studentType.toString() === 'ENADE' ? 1 : 2
    });
  }

  save(): Observable<Student> {
    try {
      FormUtil.validate(this.studentForm);
      const student = this.studentFormToStudent();
      if (!student.enrollment && student.enrollment.trim() === '') {
        return this.studentService.create(student);
      } else {
        return this.studentService.update(student);
      }
    } catch (error) {
      throw error;
    }
  }

  private studentFormToStudent(): Student {
    const student: Student = {
      enrollment: this.studentForm.get('enrollment').value,
      name: this.studentForm.get('name').value,
      cpf: this.studentForm.get('cpf').value,
      email: this.studentForm.get('email').value,
      studentType: this.studentForm.get('email').value === 1 ? StudentType.ENADE : StudentType.VESTIBULAR
    };
    return student;
  }
}
