import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DisciplineService } from './discipline.service';
import { SchoolClassService } from './school-class.service';
import { StudentService } from './student.service';
import { TeacherService } from './teacher.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    StudentService,
    TeacherService,
    DisciplineService,
    SchoolClassService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
