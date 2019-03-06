import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinesRoutingModule } from './disciplines-routing.module';
import { DisciplinesComponent } from './disciplines.component';
import { ThfModule } from '@totvs/thf-ui';

@NgModule({
  declarations: [DisciplinesComponent],
  imports: [
    ThfModule,
    DisciplinesRoutingModule
  ]
})
export class DisciplinesModule { }
