import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsModule } from '../students/students.module';
import { SchoolClassesRoutingModule } from './school-classes-routing.module';
import { SchoolClassesComponent } from './school-classes/school-classes.component';
import { SchoolClassEditComponent } from './school-class-edit/school-class-edit.component';
import { StudentNotInSchoolClassComponent } from './student-not-in-school-class/student-not-in-school-class.component';
import { DisciplineNotInSchoolClassComponent } from './discipline-not-in-school-class/discipline-not-in-school-class.component';


@NgModule({
  declarations: [
    SchoolClassesComponent,
    SchoolClassEditComponent,
    StudentNotInSchoolClassComponent,
    DisciplineNotInSchoolClassComponent
  ],
  imports: [
    SchoolClassesRoutingModule,
    SharedModule,
    StudentsModule
  ]
})
export class SchoolClassesModule { }
