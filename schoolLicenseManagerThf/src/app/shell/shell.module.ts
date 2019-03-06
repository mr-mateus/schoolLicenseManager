import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThfPageDynamicDetailModule } from '@totvs/thf-templates';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ShellRoutingModule,
  ],
  declarations: [
    ShellComponent
  ],
  providers: []
})
export class ShellModule { }
