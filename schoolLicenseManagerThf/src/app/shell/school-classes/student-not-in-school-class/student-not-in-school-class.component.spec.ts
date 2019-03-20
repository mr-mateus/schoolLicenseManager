import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ThfModule } from '@totvs/thf-ui';
import { of } from 'rxjs';
import { StudentService } from 'src/app/core/student.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { Student } from 'src/app/model/student';
import { SetUpTestBed } from 'src/test.common.spec';
import { StudentNotInSchoolClassComponent } from './student-not-in-school-class.component';


fdescribe('StudentNotInSchoolClassComponent', () => {
  let component: StudentNotInSchoolClassComponent;
  let fixture: ComponentFixture<StudentNotInSchoolClassComponent>;

  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      ThfModule
    ],
    declarations: [StudentNotInSchoolClassComponent],
    providers: [StudentService],
    schemas: [NO_ERRORS_SCHEMA]
  };

  SetUpTestBed(moduleDef);



  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNotInSchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar uma lista vazia', () => {
    spyOn(component.studentsSelected, 'emit').and.callThrough();
    component.addStudentsSelected();
    expect(component.studentsSelected.emit).toHaveBeenCalledWith([]);
  });

  fit('deve retornar a lista com os objetos que já estavam selecionados', () => {
    const students =
      [
        { 'name': 'Joanas', 'email': 'joana@teste.com', 'cpf': '01234567892', 'enrollment': '3', 'studentType': 1 },
        { 'name': 'Carlas', 'email': 'carlas@teste.com', 'cpf': '01234567893', 'enrollment': '4', 'studentType': 2 }
      ];
    const studentsServiceReturn = [];
    Object.assign(studentsServiceReturn, students);
    const studentPage: PageResponseEntity<Student> = {
      hasNext: false,
      items: studentsServiceReturn
    };
    const studentService = fixture.debugElement.injector.get(StudentService);
    spyOn(studentService, 'findAll').and.returnValue(of(studentPage));

    spyOn(component.studentsSelected, 'emit').and.callThrough();
    component.openToAddStudent(students);
    fixture.detectChanges();
    component.addStudentsSelected();
    expect(component.studentsSelected.emit).toHaveBeenCalledWith(students);
  });

  fit('ao retirar a propriedade $selected do primeiro item do array, deve retornar apenas os que estão com essa propriedade', () => {
    spyOn(component.studentsSelected, 'emit').and.callThrough();
    const joanStudent = { 'name': 'Joanas', 'email': 'joana@teste.com', 'cpf': '01234567892', 'enrollment': '3', 'studentType': 1 };
    const carlasStudent = { 'name': 'Carlas', 'email': 'carlas@teste.com', 'cpf': '01234567893', 'enrollment': '4', 'studentType': 2 };
    const students =
      [
        joanStudent,
        carlasStudent];
    const studentsServiceReturn = [];
    Object.assign(studentsServiceReturn, students);
    const studentPage: PageResponseEntity<Student> = {
      hasNext: false,
      items: studentsServiceReturn
    };
    const studentService = fixture.debugElement.injector.get(StudentService);
    spyOn(studentService, 'findAll').and.returnValue(of(studentPage));
    component.openToAddStudent(students);
    fixture.detectChanges();
    component.studentPage.items.forEach(student => {
      if (student.name === 'Joanas') {
        student['$selected'] = false;
      }
    });
    fixture.detectChanges();
    component.addStudentsSelected();
    expect(component.studentsSelected.emit).toHaveBeenCalledWith([carlasStudent]);
  });

  fit('ao retirar a propriedade $selected do primeiro item do array, deve retornar apenas os que estão com essa propriedade', () => {
    spyOn(component.studentsSelected, 'emit').and.callThrough();
    const joanStudent = { 'name': 'Joanas', 'email': 'joana@teste.com', 'cpf': '01234567892', 'enrollment': '3', 'studentType': 1 };
    const carlasStudent = { 'name': 'Carlas', 'email': 'carlas@teste.com', 'cpf': '01234567893', 'enrollment': '4', 'studentType': 2 };
    const students =
      [
        joanStudent,
        carlasStudent];
    const studentsServiceReturn = [];
    Object.assign(studentsServiceReturn, students);
    const studentPage: PageResponseEntity<Student> = {
      hasNext: false,
      items: studentsServiceReturn
    };
    const studentService = fixture.debugElement.injector.get(StudentService);
    spyOn(studentService, 'findAll').and.returnValue(of(studentPage));
    component.openToAddStudent(students);
    fixture.detectChanges();
    component.studentPage.items.forEach(student => {
      if (student.name === 'Joanas') {
        student['$selected'] = false;
      }
    });
    fixture.detectChanges();
    component.addStudentsSelected();
    expect(component.studentsSelected.emit).toHaveBeenCalledWith([carlasStudent]);
  });
});
