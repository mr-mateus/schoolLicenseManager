import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, TestModuleMetadata, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ThfModule } from '@totvs/thf-ui';
import { empty, of } from 'rxjs';
import { TeacherService } from 'src/app/core/teacher.service';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { AcademicDegree, Teacher } from 'src/app/model/teacher';
import { SetUpTestBed } from 'src/test.common.spec';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { TeachersComponent } from './teachers.component';

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      TeachersComponent,
      TeacherEditComponent
    ],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      ReactiveFormsModule,
      ThfModule
    ],
    providers: [
      TeacherService
    ]
  };

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar a função handleParams', fakeAsync(() => {
    spyOn(component, 'handleParams').and.callFake(() => { });
    component.ngOnInit();
    tick();
    expect(component.handleParams).toHaveBeenCalledTimes(1);
  }));

  it('deve chamar a função filterTeacherByName quando houver a queryParams "name"',
    fakeAsync(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
      const params = { name: 'teste' };
      activatedRoute.queryParams = of(params);
      spyOn(component, 'filterTeacherByName').and.callFake(() => { });
      component.handleParams();
      tick();
      expect(component.filterTeacherByName).toHaveBeenCalledWith(params.name);
    })));

  it('deve carregar o atributo teacherPage',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacherPage: PageResponseEntity<Teacher> = {
        hasNext: false,
        items: [{
          id: 1,
          name: 'Eduardo',
          cpf: '01234567890',
          academicDegree: AcademicDegree.DOUTOR,
          email: 'eduardo@eduardo.com.br'
        }]
      }
      spyOn(teacherService, 'findAllPaging').and.returnValue(of(teacherPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadTeachers();
      tick();
      fixture.detectChanges();
      expect(teacherService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.teacherPage).toEqual(teacherPage);
    })));

  it('deve concatenar o resultado no atributo teacherPage',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacherPage: PageResponseEntity<Teacher> = {
        hasNext: false,
        items: [{
          id: 1,
          name: 'Eduardo',
          cpf: '01234567890',
          academicDegree: AcademicDegree.DOUTOR,
          email: 'eduardo@eduardo.com.br'
        }]
      };
      Object.assign(component.teacherPage, teacherPage);
      spyOn(teacherService, 'findAllPaging').and.returnValue(of(teacherPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadTeachers();
      tick();
      fixture.detectChanges();
      expect(teacherService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.teacherPage.items.length).toEqual(2);
    })));

  it('deve concatenar o resultado no atributo teacherPage',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacherPage: PageResponseEntity<Teacher> = {
        hasNext: false,
        items: [{
          id: 1,
          name: 'Eduardo',
          cpf: '01234567890',
          academicDegree: AcademicDegree.DOUTOR,
          email: 'eduardo@eduardo.com.br'
        }]
      };
      Object.assign(component.teacherPage, teacherPage);
      spyOn(teacherService, 'findAllPaging').and.returnValue(of(teacherPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadTeachers();
      tick();
      fixture.detectChanges();
      expect(teacherService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.teacherPage.items.length).toEqual(2);
    })));

  it('deve filtrar os professores pelo nome da propriedade de filtro',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacherPage: PageResponseEntity<Teacher> = {
        hasNext: false,
        items: [{
          id: 1,
          name: 'Eduardo',
          cpf: '01234567890',
          academicDegree: AcademicDegree.DOUTOR,
          email: 'eduardo@eduardo.com.br'
        }]
      };

      spyOn(teacherService, 'findByNameContaining').and.returnValue(of(teacherPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'setTeacherNameFilter').and.callFake(() => { });
      const filter = 'eduardo';
      component.teacherNameFilter = filter;
      component.filterTeacherByName();
      tick();
      fixture.detectChanges();
      expect(teacherService.findByNameContaining).toHaveBeenCalledWith(filter, '0', '10');
      expect(component.setTeacherNameFilter).toHaveBeenCalledWith(filter);
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.teacherPage.items.length).toEqual(1);
    })));

  it('deve filtrar os professores pelo parametro passado',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacherPage: PageResponseEntity<Teacher> = {
        hasNext: false,
        items: [{
          id: 1,
          name: 'Eduardo',
          cpf: '01234567890',
          academicDegree: AcademicDegree.DOUTOR,
          email: 'eduardo@eduardo.com.br'
        }]
      };

      spyOn(teacherService, 'findByNameContaining').and.returnValue(of(teacherPage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'setTeacherNameFilter').and.callFake(() => { });
      const filter = 'janaina';
      component.teacherNameFilter = '';
      component.filterTeacherByName(filter);
      tick();
      fixture.detectChanges();
      expect(teacherService.findByNameContaining).toHaveBeenCalledWith(filter, '0', '10');
      expect(component.setTeacherNameFilter).toHaveBeenCalledWith(filter);
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.teacherPage.items.length).toEqual(1);
    })));

  it('deve chamar a função filterTeacherByName', fakeAsync(() => {
    spyOn(component, 'filterTeacherByName').and.callFake(() => { });
    const filter = 'janaina';
    component.findTeacherByName(filter);
    tick();
    fixture.detectChanges();
    expect(component.filterTeacherByName).toHaveBeenCalledWith(filter);
  }));

  it('deve abrir o modal para inserir um professor', fakeAsync(() => {
    spyOn(component.teacherEditComponent, 'openForInsert').and.callFake(() => { });
    component.openForCreate();
    tick();
    fixture.detectChanges();
    expect(component.teacherEditComponent.openForInsert).toHaveBeenCalledTimes(1);
  }));

  it('deve abrir o modal para editar um professor', fakeAsync(() => {
    const teacher: Teacher = {
      id: 1,
      name: 'Eduardo',
      cpf: '01234567890',
      academicDegree: AcademicDegree.DOUTOR,
      email: 'eduardo@eduardo.com.br'
    };
    spyOn(component.teacherEditComponent, 'openForEdit').and.callFake(() => { });
    component.openForEdit(teacher);
    tick();
    fixture.detectChanges();
    expect(component.teacherEditComponent.openForEdit).toHaveBeenCalledWith(teacher);
  }));

  it('deve buscar a próxima de registro', fakeAsync(() => {
    spyOn(component, 'nextPage').and.callFake(() => { });
    spyOn(component, 'loadTeachers').and.callFake(() => { });
    component.teacherNameFilter = '';
    component.loadMore();
    tick();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalledTimes(1);
    expect(component.loadTeachers).toHaveBeenCalledTimes(1);
  }));

  it('deve buscar a próxima de registro usando serviço de filtro por nome',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacherPage: PageResponseEntity<Teacher> = {
        hasNext: false,
        items: [{
          id: 1,
          name: 'Eduardo',
          cpf: '01234567890',
          academicDegree: AcademicDegree.DOUTOR,
          email: 'eduardo@eduardo.com.br'
        }]
      };
      const filter = 'eduardo';
      component.teacherNameFilter = filter;
      component.teacherPage = teacherPage;
      spyOn(component, 'nextPage').and.callThrough();
      spyOn(teacherService, 'findByNameContaining').and.returnValue(of(teacherPage));

      component.loadMore();

      tick();
      fixture.detectChanges();
      expect(component.nextPage).toHaveBeenCalledTimes(1);
      expect(teacherService.findByNameContaining).toHaveBeenCalledWith(filter, '1', '10');
      expect(component.teacherPage.items.length).toEqual(2);
    })));

  it('deve deletar o professor',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacher: Teacher = {
        id: 1,
        name: 'Eduardo',
        cpf: '01234567890',
        academicDegree: AcademicDegree.DOUTOR,
        email: 'eduardo@eduardo.com.br'
      };
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'resetPage').and.callFake(() => { });
      spyOn(component, 'filterTeacherByName').and.callFake(() => { });
      spyOn(teacherService, 'delete').and.returnValue(of(empty()));

      component.deleteTeacher(teacher);

      tick();
      fixture.detectChanges();
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.resetPage).toHaveBeenCalledTimes(1);
      expect(component.filterTeacherByName).toHaveBeenCalledWith(teacher.name);
      expect(teacherService.delete).toHaveBeenCalledWith(teacher.id);
    })));

  it('deve chamar o serviço que traz a lista de professores',
    fakeAsync(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
      activatedRoute.queryParams = of({ wrongParameter: 'teste' });
      spyOn(component, 'filterTeacherByName').and.callFake(() => { });
      spyOn(component, 'loadTeachers').and.callFake(() => { });
      component.handleParams();
      tick();
      expect(component.filterTeacherByName).toHaveBeenCalledTimes(0);
      expect(component.loadTeachers).toHaveBeenCalledTimes(1);
    })));

  it('deve chamar o método findTeacherByName quando o componente de edição emitir o registro criado',
    fakeAsync(() => {
      const teacher: Teacher = {
        id: 1,
        name: 'Eduardo',
        cpf: '01234567890',
        academicDegree: AcademicDegree.DOUTOR,
        email: 'eduardo@eduardo.com.br'
      };
      spyOn(component, 'findTeacherByName').and.callFake(() => { });
      component.teacherEditComponent.teacherCreated.emit(teacher);
      tick();
      fixture.detectChanges();
      expect(component.findTeacherByName).toHaveBeenCalledWith(teacher.name);
    }));

  it('deve setar a propriedade de filtro com o valor passado por parâmetro', () => {
    const filter = 'josé';
    component.setTeacherNameFilter(filter);
    expect(component.teacherNameFilter).toEqual(filter);
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
