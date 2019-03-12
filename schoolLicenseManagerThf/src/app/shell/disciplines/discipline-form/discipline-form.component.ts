import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Discipline } from 'src/app/model/discipline';
import { DisciplineService } from 'src/app/core/discipline.service';
import { Observable } from 'rxjs';
import { FormUtil } from 'src/app/core/formUtil';
import { TeacherService } from 'src/app/core/teacher.service';
import { Teacher } from 'src/app/model/teacher';
import { ThfComboOption } from '@totvs/thf-ui';

@Component({
  selector: 'app-discipline-form',
  templateUrl: './discipline-form.component.html',
  styleUrls: ['./discipline-form.component.css']
})
export class DisciplineFormComponent implements OnInit {
  disciplineForm = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    initials: ['', Validators.required],
    workload: ['', Validators.required],
    teacher: ['']
  });

  teachers: Array<Teacher> = new Array<Teacher>();
  teacherOptions: Array<ThfComboOption> = new Array<ThfComboOption>();

  constructor(private fb: FormBuilder, private disciplineService: DisciplineService, private teacherService: TeacherService) { }

  ngOnInit() {
    this.findTeachers();
  }

  findTeachers() {
    this.teacherService.findAll().subscribe(teachers => {
      this.teachers = teachers;
      this.teachers.forEach(teacher => {
        this.teacherOptions.push({ value: teacher.id, label: teacher.name });
      });
    });
  }

  save(): Observable<Discipline> {
    try {
      FormUtil.validate(this.disciplineForm);
      const discipline = this.disciplineFormToStudent();
      if (!discipline.id) {
        return this.disciplineService.create(discipline);
      } else {
        return this.disciplineService.update(discipline);
      }
    } catch (error) {
      throw error;
    }
  }

  showDisciplineForEdit(discipline: Discipline) {
    this.disciplineForm.patchValue({
      id: discipline.id,
      description: discipline.description,
      initials: discipline.initials,
      workload: discipline.workload
    });
    if (discipline.teacher) {
      this.disciplineForm.patchValue({ teacher: discipline.teacher.id });
    }
  }

  private disciplineFormToStudent(): Discipline {
    const discipline: Discipline = {
      id: this.disciplineForm.get('id').value,
      description: this.disciplineForm.get('description').value,
      initials: this.disciplineForm.get('initials').value,
      workload: this.disciplineForm.get('workload').value
    };

    const teacher = this.teachers.find((t) => t.id === this.disciplineForm.get('teacher').value);
    if (teacher) {
      discipline.teacher = teacher;
    }
    return discipline;
  }
}
