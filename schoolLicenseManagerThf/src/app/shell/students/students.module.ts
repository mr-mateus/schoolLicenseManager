import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentFormComponent } from './student-form/student-form.component';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    StudentsRoutingModule
  ],
  declarations: [
    StudentsComponent,
    StudentEditComponent,
    StudentFormComponent
  ],
  providers: []
})
export class StudentsModule { }
