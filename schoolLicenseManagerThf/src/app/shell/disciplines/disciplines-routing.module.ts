import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinesComponent } from './disciplines.component';

const disciplinesRoutes: Routes = [
  { path: '', component: DisciplinesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(disciplinesRoutes)],
  exports: [RouterModule]
})
export class DisciplinesRoutingModule { }
