import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolClassesComponent } from './school-classes.component';

export const schoolClassesRoutes: Routes = [
  { path: '', component: SchoolClassesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(schoolClassesRoutes)],
  exports: [RouterModule]
})
export class SchoolClassesRoutingModule { }
