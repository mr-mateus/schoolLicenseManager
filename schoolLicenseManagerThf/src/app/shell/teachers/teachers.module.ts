import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TeachersRoutingModule
  ],
  declarations: [
    TeachersComponent,
    TeacherEditComponent,
    TeacherFormComponent
  ],
  providers: []
})
export class TeachersModule { }
