import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolClassesComponent } from './school-classes.component';
import { SchoolClassListComponent } from './school-class-list/school-class-list.component';

export const schoolClassesRoutes: Routes = [
  {
    path: '', component: SchoolClassesComponent,
    children: [
      { path: '', component: SchoolClassListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(schoolClassesRoutes)],
  exports: [RouterModule]
})
export class SchoolClassesRoutingModule { }
