import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';


export const studentsRoutes: Routes = [
  { path: '', component: StudentsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(studentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentsRoutingModule { }
