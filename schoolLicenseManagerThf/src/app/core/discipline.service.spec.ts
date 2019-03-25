import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { of } from 'rxjs';
import { SetUpTestBed } from 'src/test.common.spec';
import { DisciplineService } from './discipline.service';


fdescribe('DisciplineService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [DisciplineService]
  };
  SetUpTestBed(moduleDef);
  let disciplineService: DisciplineService;

  fit('deve ser instanciado', () => {
    spyOn(DisciplineService.prototype, 'initializeEndpoint').and.callThrough();
    disciplineService = TestBed.get(DisciplineService);
    expect(disciplineService.initializeEndpoint).toHaveBeenCalled();
    expect(disciplineService.getEndpoint()).toEqual('disciplines');
  });

  fit('deve fazer a busca pela sigla da disciplina', (inject([HttpClient], (httpMocked: HttpClient) => {
    const http = httpMocked;

    spyOn(http, 'get').and.returnValue(of({}));

    disciplineService = TestBed.get(DisciplineService);

    const page = 122;
    const size = 30;
    const initial = 'opa';
    const params = new HttpParams().set('name', initial).set('page', page + '').set('size', size + '');
    disciplineService.findByInitialsContaining(initial, page + '', size + '').subscribe();
    expect(http.get).toHaveBeenCalledWith(disciplineService.getUri(), { params: params });
  })));
});
