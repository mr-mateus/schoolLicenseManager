import { ComponentFixture, TestBed, TestModuleMetadata, inject, fakeAsync, tick } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SetUpTestBed } from 'src/test.common.spec';
import { StudentService } from 'src/app/core/student.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentsComponent } from './students.component';

fdescribe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      StudentsComponent
    ],
    imports: [
      RouterTestingModule.withRoutes([]),
      HttpClientTestingModule
    ],
    providers: [StudentService,],
    schemas: [NO_ERRORS_SCHEMA]
  };

  let studentService: StudentService;
  SetUpTestBed(moduleDef);
  beforeAll((inject([StudentService], (_studentService: StudentService) => {
    studentService = _studentService;
  })));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método getStudents', fakeAsync(() => {
    spyOn(studentService, 'getStudents').and.returnValue(of({}));
    component.ngOnInit();
    tick();
    expect(studentService.getStudents).toHaveBeenCalled();

  }));
});
