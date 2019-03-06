import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolClassesRoutingModule } from './school-classes-routing.module';
import { SchoolClassesComponent } from './school-classes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SchoolClassesComponent],
  imports: [
    SharedModule,
    SchoolClassesRoutingModule
  ]
})
export class SchoolClassesModule { }
