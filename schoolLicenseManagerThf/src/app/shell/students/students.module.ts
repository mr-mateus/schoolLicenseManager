import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';


@NgModule({
  imports: [
    SharedModule,
    StudentsRoutingModule
  ],
  declarations: [
    StudentsComponent
  ],
  providers: []
})
export class StudentsModule { }
