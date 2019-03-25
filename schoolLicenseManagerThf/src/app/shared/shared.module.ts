import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThfModule } from '@totvs/thf-ui';


@NgModule({
  imports: [
    CommonModule,
    ThfModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    ThfModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
