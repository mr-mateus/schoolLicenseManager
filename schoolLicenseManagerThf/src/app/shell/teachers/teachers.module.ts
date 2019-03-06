import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';


@NgModule({
  imports: [
    SharedModule,
    TeachersRoutingModule
  ],
  declarations: [
    TeachersComponent
  ],
  providers: []
})
export class TeachersModule { }
