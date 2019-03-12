import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinesRoutingModule } from './disciplines-routing.module';
import { DisciplinesComponent } from './disciplines.component';
import { ThfModule } from '@totvs/thf-ui';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DisciplinesComponent, DisciplineFormComponent, DisciplineEditComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DisciplinesRoutingModule
  ]
})
export class DisciplinesModule { }
