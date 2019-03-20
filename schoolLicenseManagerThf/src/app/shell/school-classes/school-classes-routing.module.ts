import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolClassEditComponent } from './school-class-edit/school-class-edit.component';
import { SchoolClassesComponent } from './school-classes/school-classes.component';

export const schoolClassesRoutes: Routes = [
  { path: '', component: SchoolClassesComponent },
  { path: 'schoolClass', redirectTo: 'schoolClass/' },
  { path: 'schoolClass/:id', component: SchoolClassEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(schoolClassesRoutes)],
  exports: [RouterModule]
})
export class SchoolClassesRoutingModule { }
