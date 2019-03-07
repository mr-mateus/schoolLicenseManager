import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { StudentEditComponent } from './students/student-edit/student-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
