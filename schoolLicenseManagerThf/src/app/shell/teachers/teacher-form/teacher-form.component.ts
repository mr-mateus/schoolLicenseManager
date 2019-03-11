import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TeacherService } from 'src/app/core/teacher.service';
import { ThfRadioGroupOption } from '@totvs/thf-ui';
import { Teacher, AcademicDegree } from 'src/app/model/teacher';
import { FormUtil } from 'src/app/core/formUtil';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  teacherForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required],
    academicDegree: ['', Validators.required],
  });

  readonly academicDegreeOptions: Array<ThfRadioGroupOption> = [
    { label: 'MESTRE', value: 1 },
    { label: 'DOUTOR', value: 2 },
    { label: 'PHD', value: 3 }
  ];
  constructor(private fb: FormBuilder, private teacherService: TeacherService) { }

  ngOnInit() {
  }

  save(): Observable<Teacher> {
    try {
      FormUtil.validate(this.teacherForm);
      const teacher = this.teacherFormToTeacher();
      if (!teacher.id) {
        return this.teacherService.create(teacher);
      } else {
        return this.teacherService.update(teacher);
      }
    } catch (error) {
      throw error;
    }
  }

  showTeacherForEdit(teacher: Teacher) {
    this.teacherForm.patchValue({
      id: teacher.id,
      name: teacher.name,
      cpf: teacher.cpf,
      email: teacher.email,
      academicDegree  : this.transformEnumToAcademicDegreeRadioOption(teacher.academicDegree)
    });
  }

  private teacherFormToTeacher(): Teacher {
    const teacher: Teacher = {
      id: this.teacherForm.get('id').value,
      name: this.teacherForm.get('name').value,
      cpf: this.teacherForm.get('cpf').value,
      email: this.teacherForm.get('email').value,
      academicDegree: this.transformAcademicDegreeRadioOptionToEnum()
    };

    return teacher;
  }

  private transformAcademicDegreeRadioOptionToEnum(): number {
    /*devido a limiteção do THF, enum em tela, o ThfSelect deve começar com o valor 1
    * necessário transformar para o valor que a entidade no banco de dados aceite
    */
    return this.teacherForm.get('academicDegree').value - 1;
  }

  private transformEnumToAcademicDegreeRadioOption(academicDegree: AcademicDegree): number {
    /*devido a limiteção do THF, enum em tela, o ThfSelect deve começar com o valor 1
    * necessário transformar para o valor que a entidade no banco de dados aceite
    */
    switch (academicDegree.toString()) {
      case 'MESTRE':
        return 1;

      case 'DOUTOR':
        return 2;

      case 'PHD':
        return 3;
    }
  }

}
