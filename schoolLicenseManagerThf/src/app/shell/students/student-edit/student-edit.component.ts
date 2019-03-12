import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ThfModalAction, ThfModalComponent, ThfPageFilter } from '@totvs/thf-ui';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/core/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {
  @ViewChild(ThfModalComponent) public thfModal: ThfModalComponent;
  @ViewChild(StudentFormComponent) public studentFormComponent: StudentFormComponent;
  @Output() public studentCreated = new EventEmitter<Student>();

  public close: ThfModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar'
  };

  public confirm: ThfModalAction = {
    action: () => {
      this.processStudent();
    },
    label: 'Salvar'
  };

  constructor(private studentService: StudentService) {
  }

  public openForInsert(): void {
    this.thfModal.open();
  }

  public openForUpdate(studentId: string): void {
    this.studentService.findById(studentId).subscribe(student => {
      this.studentFormComponent.showStudentForEdit(student);
      this.thfModal.open();
    });
  }

  public closeModal() {
    this.thfModal.close();
    this.studentFormComponent.studentForm.reset();
  }

  public processStudent() {
    this.studentFormComponent.save().subscribe(student => {
      this.closeModal();
      this.studentCreated.emit(student);

    });
  }
}


