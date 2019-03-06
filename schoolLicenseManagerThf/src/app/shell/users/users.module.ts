import { NgModule } from '@angular/core';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
