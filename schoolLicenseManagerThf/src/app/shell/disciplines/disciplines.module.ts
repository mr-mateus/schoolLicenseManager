import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';
import { DisciplinesRoutingModule } from './disciplines-routing.module';
import { DisciplinesComponent } from './disciplines/disciplines.component';


@NgModule({
  declarations: [DisciplinesComponent, DisciplineEditComponent],
  imports: [
    SharedModule,
    DisciplinesRoutingModule
  ]
})
export class DisciplinesModule { }
