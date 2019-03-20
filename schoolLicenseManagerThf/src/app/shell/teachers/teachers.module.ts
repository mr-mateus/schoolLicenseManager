import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
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
  ],
  providers: []
})
export class TeachersModule { }
