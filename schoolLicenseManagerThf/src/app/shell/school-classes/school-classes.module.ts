import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolClassesRoutingModule } from './school-classes-routing.module';
import { SchoolClassesComponent } from './school-classes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolClassListComponent } from './school-class-list/school-class-list.component';
import { SchoolClassEditComponent } from './school-class-edit/school-class-edit.component';
import { SchoolClassFormComponent } from './school-class-form/school-class-form.component';
import { SchoolClassTableComponent } from './school-class-table/school-class-table.component';

@NgModule({
  declarations: [SchoolClassesComponent, SchoolClassListComponent, SchoolClassEditComponent, SchoolClassFormComponent, SchoolClassTableComponent],
  imports: [
    SharedModule,
    SchoolClassesRoutingModule
  ]
})
export class SchoolClassesModule { }
