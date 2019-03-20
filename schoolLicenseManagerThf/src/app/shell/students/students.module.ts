import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsComponent } from './students/students.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [StudentsComponent, StudentEditComponent],
  imports: [
    SharedModule,
    StudentsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [StudentEditComponent]
})
export class StudentsModule { }
