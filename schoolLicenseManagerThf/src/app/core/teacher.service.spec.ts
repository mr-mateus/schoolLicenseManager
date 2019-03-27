import { TestBed, TestModuleMetadata, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentService } from './student.service';
import { SetUpTestBed } from 'src/test.common.spec';
import { of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientTestingModule
    ],
    providers: [TeacherService]
  };

  SetUpTestBed(moduleDef);

  let teacherService: TeacherService;
  it('deve ser instanciado', () => {
    spyOn(TeacherService.prototype, 'initializeEndpoint').and.callThrough();
    teacherService = TestBed.get(TeacherService);
    expect(teacherService.initializeEndpoint).toHaveBeenCalled();
    expect(teacherService.getEndpoint()).toEqual('teachers');
  });

  it('deve fazer a busca pela nome do aluno', (inject([HttpClient], (httpMocked: HttpClient) => {
    const http = httpMocked;

    spyOn(http, 'get').and.returnValue(of({}));

    teacherService = TestBed.get(TeacherService);

    const page = 122;
    const size = 30;
    const name = 'opa';
    const params = new HttpParams().set('name', name).set('page', page + '').set('size', size + '');
    teacherService.findByNameContaining(name, page + '', size + '').subscribe();
    expect(http.get).toHaveBeenCalledWith(teacherService.getUri(), { params: params });
  })));
});
