import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, TestModuleMetadata, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ThfDialogService, ThfModule } from '@totvs/thf-ui';
import { empty, of } from 'rxjs';
import { StudentService } from 'src/app/core/student.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { Student, StudentType } from 'src/app/model/student';
import { SetUpTestBed } from 'src/test.common.spec';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { StudentsComponent } from './students.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      StudentsComponent,
      StudentEditComponent
    ],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      ReactiveFormsModule,
      ThfModule
    ],
    providers: [
      StudentService
    ]
  };

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar a função handleParams', fakeAsync(() => {
    spyOn(component, 'handleParams').and.callFake(() => { });
    component.ngOnInit();
    tick();
    expect(component.handleParams).toHaveBeenCalledTimes(1);
  }));

  it('deve chamar a função filterStudentByName quando houver a queryParams "name"',
    fakeAsync(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
      const params = { name: 'teste' };
      activatedRoute.queryParams = of(params);
      spyOn(component, 'filterStudentByName').and.callFake(() => { });
      component.handleParams();
      tick();
      expect(component.filterStudentByName).toHaveBeenCalledWith(params.name);
    })));

  it('deve carregar o atributo studentPage',
    fakeAsync(inject([StudentService], (studentService: StudentService) => {
      const studentPage: PageResponseEntity<Student> = {
        hasNext: false,
        items: [
          {
            enrollment: '1',
            name: 'Eduardo',
            cpf: '01234567890',
            email: 'eduardo@eduardo.com.br',
            studentType: StudentType.ENADE

          }]
      };
      spyOn(studentService, 'findAllPaging').and.returnValue(of(studentPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadStudents();
      tick();
      fixture.detectChanges();
      expect(studentService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.studentPage).toEqual(studentPage);
    })));

  it('deve concatenar o resultado no atributo studentPage',
    fakeAsync(inject([StudentService], (studentService: StudentService) => {
      const studentPage: PageResponseEntity<Student> = {
        hasNext: false,
        items: [
          {
            enrollment: '1',
            name: 'Eduardo',
            cpf: '01234567890',
            email: 'eduardo@eduardo.com.br',
            studentType: StudentType.VESTIBULAR

          }]
      };
      Object.assign(component.studentPage, studentPage);
      spyOn(studentService, 'findAllPaging').and.returnValue(of(studentPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadStudents();
      tick();
      fixture.detectChanges();
      expect(studentService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.studentPage.items.length).toEqual(2);
    })));

  it('deve concatenar o resultado no atributo studentPage',
    fakeAsync(inject([StudentService], (studentService: StudentService) => {
      const studentPage: PageResponseEntity<Student> = {
        hasNext: false,
        items: [
          {
            enrollment: '1',
            name: 'Eduardo',
            cpf: '01234567890',
            email: 'eduardo@eduardo.com.br',
            studentType: StudentType.VESTIBULAR

          }]
      };
      Object.assign(component.studentPage, studentPage);
      spyOn(studentService, 'findAllPaging').and.returnValue(of(studentPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadStudents();
      tick();
      fixture.detectChanges();
      expect(studentService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.studentPage.items.length).toEqual(2);
    })));

  it('deve filtrar os alunos pelo nome',
    fakeAsync(inject([StudentService], (studentService: StudentService) => {
      const studentPage: PageResponseEntity<Student> = {
        hasNext: false,
        items: [
          {
            enrollment: '1',
            name: 'Eduardo',
            cpf: '01234567890',
            email: 'eduardo@eduardo.com.br',
            studentType: StudentType.VESTIBULAR

          }]
      };

      spyOn(studentService, 'findByNameContaining').and.returnValue(of(studentPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'setStudentNameFilter').and.callFake(() => { });
      const filter = 'eduardo';
      component.studentNameFilter = filter;
      component.filterStudentByName();
      tick();
      fixture.detectChanges();
      expect(studentService.findByNameContaining).toHaveBeenCalledWith(filter, 0, 10);
      expect(component.setStudentNameFilter).toHaveBeenCalledWith(filter);
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.studentPage.items.length).toEqual(1);
    })));

  it('deve filtrar os alunos com parametro passado',
    fakeAsync(inject([StudentService], (studentService: StudentService) => {
      const studentPage: PageResponseEntity<Student> = {
        hasNext: false,
        items: [
          {
            enrollment: '1',
            name: 'Eduardo',
            cpf: '01234567890',
            email: 'eduardo@eduardo.com.br',
            studentType: StudentType.VESTIBULAR

          }]
      };

      spyOn(studentService, 'findByNameContaining').and.returnValue(of(studentPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'setStudentNameFilter').and.callFake(() => { });
      const filter = 'janaina';
      component.studentNameFilter = '';
      component.filterStudentByName(filter);
      tick();
      fixture.detectChanges();
      expect(studentService.findByNameContaining).toHaveBeenCalledWith(filter, 0, 10);
      expect(component.setStudentNameFilter).toHaveBeenCalledWith(filter);
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.studentPage.items.length).toEqual(1);
    })));

  it('deve chamar a função filterStudentByName', fakeAsync(() => {
    spyOn(component, 'filterStudentByName').and.callFake(() => { });
    const filter = 'janaina';
    component.findStudentByName(filter);
    tick();
    fixture.detectChanges();
    expect(component.filterStudentByName).toHaveBeenCalledWith(filter);
  }));

  it('deve abrir o modal para inserir um aluno', fakeAsync(() => {
    spyOn(component.studentEdit, 'openForCreate').and.callFake(() => { });
    component.openForCreate();
    tick();
    fixture.detectChanges();
    expect(component.studentEdit.openForCreate).toHaveBeenCalledTimes(1);
  }));

  it('deve abrir o modal para editar um aluno', fakeAsync(() => {
    const student: Student = {
      enrollment: '1',
      name: 'Eduardo',
      cpf: '01234567890',
      email: 'eduardo@eduardo.com.br',
      studentType: StudentType.VESTIBULAR

    };
    spyOn(component.studentEdit, 'openForEdit').and.callFake(() => { });
    component.openForEdit(student);
    tick();
    fixture.detectChanges();
    expect(component.studentEdit.openForEdit).toHaveBeenCalledWith(student);
  }));

  it('deve buscar a próxima de registro', fakeAsync(() => {
    spyOn(component, 'nextPage').and.callFake(() => { });
    spyOn(component, 'loadStudents').and.callFake(() => { });
    component.studentNameFilter = '';
    component.loadMore();
    tick();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalledTimes(1);
    expect(component.loadStudents).toHaveBeenCalledTimes(1);
  }));

  it('deve buscar a próxima de registro usando serviço de filtro por nome',
    fakeAsync(inject([StudentService], (studentService: StudentService) => {
      const studentPage: PageResponseEntity<Student> = {
        hasNext: false,
        items: [{
          enrollment: '1',
          name: 'Eduardo',
          cpf: '01234567890',
          email: 'eduardo@eduardo.com.br',
          studentType: StudentType.VESTIBULAR

        }]
      };
      const filter = 'eduardo';
      component.studentNameFilter = filter;
      component.studentPage = studentPage;
      spyOn(component, 'nextPage').and.callThrough();
      spyOn(studentService, 'findByNameContaining').and.returnValue(of(studentPage));

      component.loadMore();

      tick();
      fixture.detectChanges();
      expect(component.nextPage).toHaveBeenCalledTimes(1);
      expect(studentService.findByNameContaining).toHaveBeenCalledWith(filter, 1, 10);
      expect(component.studentPage.items.length).toEqual(2);
    })));

  it('deve chamar a dialog de confirmação',
    fakeAsync(inject([ThfDialogService],
      (thfDialog: ThfDialogService) => {
        const student: Student = {
          enrollment: '1',
          name: 'Eduardo',
          cpf: '01234567890',
          email: 'eduardo@eduardo.com.br',
          studentType: StudentType.VESTIBULAR
        };

        spyOn(thfDialog, 'confirm').and.callThrough();
        component.confirmStudentDelete(student);
        tick();
        fixture.detectChanges();
        expect(thfDialog.confirm).toHaveBeenCalled();
      })));

  it('deve chamar o serviço para eliminar o registro',
    fakeAsync(inject([StudentService],
      (studentService: StudentService) => {
        const student: Student = {
          enrollment: '1',
          name: 'Eduardo',
          cpf: '01234567890',
          email: 'eduardo@eduardo.com.br',
          studentType: StudentType.VESTIBULAR
        };

        spyOn(studentService, 'delete').and.returnValue(of(empty()));
        component.deleteStudent(student);
        tick();
        fixture.detectChanges();
        expect(studentService.delete).toHaveBeenCalledWith(+student.enrollment);
      })));

  it('deve chamar o serviço que traz a lista de alunos',
    fakeAsync(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
      activatedRoute.queryParams = of({ wrongParameter: 'teste' });
      spyOn(component, 'filterStudentByName').and.callFake(() => { });
      spyOn(component, 'loadStudents').and.callFake(() => { });
      component.handleParams();
      tick();
      expect(component.filterStudentByName).toHaveBeenCalledTimes(0);
      expect(component.loadStudents).toHaveBeenCalledTimes(1);
    })));

  it('deve chamar o método findStudentByName quando o componente de edição emitir o registro criado',
    fakeAsync(() => {
      const student: Student = {
        enrollment: '1',
        name: 'Eduardo',
        cpf: '01234567890',
        email: 'eduardo@eduardo.com.br',
        studentType: StudentType.VESTIBULAR

      };
      spyOn(component, 'findStudentByName').and.callFake(() => { });
      component.studentEdit.studentCreated.emit(student);
      tick();
      fixture.detectChanges();
      expect(component.findStudentByName).toHaveBeenCalledWith(student.name);
    }));

  it('deve setar a propriedade de filtro com o valor passado por parâmetro', () => {
    const filter = 'josé';
    component.setStudentNameFilter(filter);
    expect(component.studentNameFilter).toEqual(filter);
  });

  it('deve setar a propriedade isLoading como true', () => {
    component.startLoading();
    expect(component.isLoading).toBeTruthy();
  });

  it('deve setar a propriedade isLoading como false', () => {
    component.stopLoading();
    expect(component.isLoading).toBeFalsy();
  });

  it('deve adicionar uma a próxima página', () => {
    component['page'] = 0;
    component.nextPage();
    expect(component['page']).toEqual(1);
  });

  it('deve resar a pagina para a primeira página', () => {
    component['page'] = 10;
    component.resetPage();
    expect(component['page']).toEqual(0);
  });
});
