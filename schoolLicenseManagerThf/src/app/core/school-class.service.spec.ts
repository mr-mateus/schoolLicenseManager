import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';
import { SetUpTestBed } from 'src/test.common.spec';
import { SchoolClassService } from './school-class.service';
import { of } from 'rxjs';
import { SchoolClass } from '../model/schoolClass';

fdescribe('SchoolClassService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [SchoolClassService]
  };
  SetUpTestBed(moduleDef);
  let schoolClassService: SchoolClassService;

  fit('deve ser instanciado', () => {
    spyOn(SchoolClassService.prototype, 'initializeEndpoint').and.callThrough();
    schoolClassService = TestBed.get(SchoolClassService);
    expect(schoolClassService.initializeEndpoint).toHaveBeenCalled();
    expect(schoolClassService.getEndpoint()).toEqual('schoolClasses');
  });

  fit('deve fazer a busca pela descrição da turma', (inject([HttpClient], (httpMocked: HttpClient) => {
    const http = httpMocked;

    spyOn(http, 'get').and.returnValue(of({}));

    schoolClassService = TestBed.get(SchoolClassService);

    const page = 122;
    const size = 30;
    const description = 'opa';
    const params = new HttpParams().set('description', description).set('page', page + '').set('size', size + '');
    schoolClassService.findByDescriptionContaining(description, page + '', size + '').subscribe();
    expect(http.get).toHaveBeenCalledWith(schoolClassService.getUri(), { params: params });
  })));

  fit('deve retornar um objeto com as propriedades nulas', () => {
    schoolClassService = TestBed.get(SchoolClassService);
    const schoolClass: SchoolClass = {
      description: null,
      period: null,
      vacancies: null,
      year: null
    };
    expect(schoolClassService.getEmptySchoolClass()).toEqual(schoolClass);
  });
});
