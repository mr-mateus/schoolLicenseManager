import { async, ComponentFixture, TestBed, TestModuleMetadata, fakeAsync, tick, inject } from '@angular/core/testing';

import { DisciplinesComponent } from './disciplines.component';
import { DisciplineEditComponent } from '../discipline-edit/discipline-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ThfModule } from '@totvs/thf-ui';
import { DisciplineService } from 'src/app/core/discipline.service';
import { SetUpTestBed } from 'src/test.common.spec';
import { ActivatedRoute } from '@angular/router';
import { of, empty } from 'rxjs';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { Discipline } from 'src/app/model/discipline';

describe('DisciplinesComponent', () => {
  let component: DisciplinesComponent;
  let fixture: ComponentFixture<DisciplinesComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      DisciplinesComponent,
      DisciplineEditComponent
    ],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      ReactiveFormsModule,
      ThfModule
    ],
    providers: [
      DisciplineService
    ]
  };

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinesComponent);
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

  it('deve chamar a função filterDisciplineByInitials quando houver a queryParams "initials"',
    fakeAsync(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
      const params = { initials: 'teste' };
      activatedRoute.queryParams = of(params);
      spyOn(component, 'filterDisciplineByInitials').and.callFake(() => { });
      component.handleParams();
      tick();
      expect(component.filterDisciplineByInitials).toHaveBeenCalledWith(params.initials);
    })));

  it('deve carregar o atributo disciplinePage',
    fakeAsync(inject([DisciplineService], (disciplineService: DisciplineService) => {
      const disciplinePage: PageResponseEntity<Discipline> = {
        hasNext: false,
        items: [
          {
            id: 1,
            description: 'matematica',
            initials: 'MAT',
            workload: 50
          }]
      };
      spyOn(disciplineService, 'findAllPaging').and.returnValue(of(disciplinePage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadDisciplines();
      tick();
      fixture.detectChanges();
      expect(disciplineService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.disciplinePage).toEqual(disciplinePage);
    })));

  it('deve concatenar o resultado no atributo disciplinePage',
    fakeAsync(inject([DisciplineService], (disciplineService: DisciplineService) => {
      const disciplinePage: PageResponseEntity<Discipline> = {
        hasNext: false,
        items: [
          {
            id: 1,
            description: 'matematica',
            initials: 'MAT',
            workload: 50
          }]
      };
      Object.assign(component.disciplinePage, disciplinePage);
      spyOn(disciplineService, 'findAllPaging').and.returnValue(of(disciplinePage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadDisciplines();
      tick();
      fixture.detectChanges();
      expect(disciplineService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.disciplinePage.items.length).toEqual(2);
    })));

  it('deve concatenar o resultado no atributo disciplinePage',
    fakeAsync(inject([DisciplineService], (disciplineService: DisciplineService) => {
      const disciplinePage: PageResponseEntity<Discipline> = {
        hasNext: false,
        items: [
          {
            id: 1,
            description: 'matematica',
            initials: 'MAT',
            workload: 50
          }]
      };
      Object.assign(component.disciplinePage, disciplinePage);
      spyOn(disciplineService, 'findAllPaging').and.returnValue(of(disciplinePage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      component.loadDisciplines();
      tick();
      fixture.detectChanges();
      expect(disciplineService.findAllPaging).toHaveBeenCalledWith('0', '10');
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.disciplinePage.items.length).toEqual(2);
    })));

  it('deve filtrar as disciplinas pela sigla',
    fakeAsync(inject([DisciplineService], (disciplineService: DisciplineService) => {
      const disciplinePage: PageResponseEntity<Discipline> = {
        hasNext: false,
        items: [
          {
            id: 1,
            description: 'matematica',
            initials: 'MAT',
            workload: 50
          }]
      };

      spyOn(disciplineService, 'findByInitialsContaining').and.returnValue(of(disciplinePage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'setDisciplineInitialFilter').and.callFake(() => { });
      const filter = 'eduardo';
      component.disciplineInitialsFilter = filter;
      component.filterDisciplineByInitials();
      tick();
      fixture.detectChanges();
      expect(disciplineService.findByInitialsContaining).toHaveBeenCalledWith(filter, '0', '10');
      expect(component.setDisciplineInitialFilter).toHaveBeenCalledWith(filter);
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.disciplinePage.items.length).toEqual(1);
    })));

  it('deve filtrar as disciplinas com parametro passado',
    fakeAsync(inject([DisciplineService], (disciplineService: DisciplineService) => {
      const disciplinePage: PageResponseEntity<Discipline> = {
        hasNext: false,
        items: [
          {
            id: 1,
            description: 'matematica',
            initials: 'MAT',
            workload: 50
          }]
      };

      spyOn(disciplineService, 'findByInitialsContaining').and.returnValue(of(disciplinePage));
      spyOn(component, 'startLoading').and.callFake(() => { });
      spyOn(component, 'stopLoading').and.callFake(() => { });
      spyOn(component, 'setDisciplineInitialFilter').and.callFake(() => { });
      const filter = 'janaina';
      component.disciplineInitialsFilter = '';
      component.filterDisciplineByInitials(filter);
      tick();
      fixture.detectChanges();
      expect(disciplineService.findByInitialsContaining).toHaveBeenCalledWith(filter, '0', '10');
      expect(component.setDisciplineInitialFilter).toHaveBeenCalledWith(filter);
      expect(component.startLoading).toHaveBeenCalledTimes(1);
      expect(component.stopLoading).toHaveBeenCalledTimes(1);
      expect(component.disciplinePage.items.length).toEqual(1);
    })));

  it('deve chamar a função findDisciplineByInitials', fakeAsync(() => {
    spyOn(component, 'filterDisciplineByInitials').and.callFake(() => { });
    const filter = 'janaina';
    component.findDisciplineByInitials(filter);
    tick();
    fixture.detectChanges();
    expect(component.filterDisciplineByInitials).toHaveBeenCalledWith(filter);
  }));

  it('deve abrir o modal para inserir uma disciplina', fakeAsync(() => {
    spyOn(component.disciplineEditComponent, 'openForCreate').and.callFake(() => { });
    component.openForCreate();
    tick();
    fixture.detectChanges();
    expect(component.disciplineEditComponent.openForCreate).toHaveBeenCalledTimes(1);
  }));

  it('deve abrir o modal para editar uma disciplina', fakeAsync(() => {
    const discipline: Discipline = {
      id: 1,
      description: 'matematica',
      initials: 'MAT',
      workload: 50
    };
    spyOn(component.disciplineEditComponent, 'openForEdit').and.callFake(() => { });
    component.openForEdit(discipline);
    tick();
    fixture.detectChanges();
    expect(component.disciplineEditComponent.openForEdit).toHaveBeenCalledWith(discipline);
  }));

  it('deve buscar a próxima de registro', fakeAsync(() => {
    spyOn(component, 'nextPage').and.callFake(() => { });
    spyOn(component, 'loadDisciplines').and.callFake(() => { });
    component.disciplineInitialsFilter = '';
    component.loadMore();
    tick();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalledTimes(1);
    expect(component.loadDisciplines).toHaveBeenCalledTimes(1);
  }));

  it('deve buscar a próxima de registro usando serviço de filtro por sigla',
    fakeAsync(inject([DisciplineService], (disciplineService: DisciplineService) => {
      const disciplinaPage: PageResponseEntity<Discipline> = {
        hasNext: false,
        items: [{
          id: 1,
          description: 'matematica',
          initials: 'MAT',
          workload: 50
        }]
      };
      const filter = 'eduardo';
      component.disciplineInitialsFilter = filter;
      component.disciplinePage = disciplinaPage;
      spyOn(component, 'nextPage').and.callThrough();
      spyOn(disciplineService, 'findByInitialsContaining').and.returnValue(of(disciplinaPage));

      component.loadMore();

      tick();
      fixture.detectChanges();
      expect(component.nextPage).toHaveBeenCalledTimes(1);
      expect(disciplineService.findByInitialsContaining).toHaveBeenCalledWith(filter, '1', '10');
      expect(component.disciplinePage.items.length).toEqual(2);
    })));

  it('deve chamar o serviço para eliminar o registro',
    fakeAsync(inject([DisciplineService],
      (disciplineService: DisciplineService) => {
        const discipline: Discipline = {
          id: 1,
          description: 'matematica',
          initials: 'MAT',
          workload: 50
        };

        spyOn(disciplineService, 'delete').and.returnValue(of(empty()));
        component.deleteDiscipline(discipline);
        tick();
        fixture.detectChanges();
        expect(disciplineService.delete).toHaveBeenCalledWith(discipline.id);
      })));

  it('deve chamar o serviço que traz a lista de disciplinas',
    fakeAsync(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
      activatedRoute.queryParams = of({ wrongParameter: 'teste' });
      spyOn(component, 'filterDisciplineByInitials').and.callFake(() => { });
      spyOn(component, 'loadDisciplines').and.callFake(() => { });
      component.handleParams();
      tick();
      expect(component.filterDisciplineByInitials).toHaveBeenCalledTimes(0);
      expect(component.loadDisciplines).toHaveBeenCalledTimes(1);
    })));

  it('deve chamar o método findDisciplineByInitials quando o componente de edição emitir o registro criado',
    fakeAsync(() => {
      const discipline: Discipline = {
        id: 1,
        description: 'matematica',
        initials: 'MAT',
        workload: 50
      };

      spyOn(component, 'findDisciplineByInitials').and.callFake(() => { });
      component.disciplineEditComponent.disciplineCreated.emit(discipline);
      tick();
      fixture.detectChanges();
      expect(component.findDisciplineByInitials).toHaveBeenCalledWith(discipline.initials);
    }));

  it('deve setar a propriedade de filtro com o valor passado por parâmetro', () => {
    const filter = 'josé';
    component.setDisciplineInitialFilter(filter);
    expect(component.disciplineInitialsFilter).toEqual(filter);
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
