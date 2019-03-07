import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from 'src/app/core/student.service';
import { SetUpTestBed } from 'src/test.common.spec';
import { SchoolClassesComponent } from './school-classes.component';


fdescribe('SchoolClassesComponent', () => {
  let component: SchoolClassesComponent;
  let fixture: ComponentFixture<SchoolClassesComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      SchoolClassesComponent
    ],
    imports: [
      RouterTestingModule.withRoutes([]),
      HttpClientTestingModule
    ],
    providers: [StudentService,],
    schemas: [NO_ERRORS_SCHEMA]
  };

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
