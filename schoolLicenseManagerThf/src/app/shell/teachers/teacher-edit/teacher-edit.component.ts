import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { ThfModalComponent, ThfModalAction } from '@totvs/thf-ui';
import { TeacherService } from 'src/app/core/teacher.service';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  @ViewChild(ThfModalComponent) public thfModal: ThfModalComponent;
  @ViewChild(TeacherFormComponent) public teacherFormComponent: TeacherFormComponent;

  @Output() public teacherCreated = new EventEmitter<Teacher>();

  public close: ThfModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar',
    danger: true
  };

  public confirm: ThfModalAction = {
    action: () => {
      this.processTeacher();
    },
    label: 'Salvar'
  };

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
  }

  openForInsert() {
    this.thfModal.open();
  }

  public openForUpdate(teacherId: number): void {
    this.teacherService.findById(teacherId).subscribe(teacher => {
      this.teacherFormComponent.showTeacherForEdit(teacher);
      this.thfModal.open();
    });
  }

  public closeModal() {
    this.thfModal.close();
    this.teacherFormComponent.teacherForm.reset();
  }

  public processTeacher() {
    this.teacherFormComponent.save().subscribe(teacher => {
      this.closeModal();
      console.log(teacher);
      this.teacherCreated.emit(teacher);

    });
  }

}
