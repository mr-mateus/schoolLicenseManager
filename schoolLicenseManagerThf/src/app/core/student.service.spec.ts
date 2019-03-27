import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestModuleMetadata, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SetUpTestBed } from 'src/test.common.spec';
import { StudentService } from './student.service';

describe('StudentService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientTestingModule
    ],
    providers: [StudentService]
  };
  SetUpTestBed(moduleDef);

  let studentService: StudentService;
  it('deve ser instanciado', () => {
    spyOn(StudentService.prototype, 'initializeEndpoint').and.callThrough();
    studentService = TestBed.get(StudentService);
    expect(studentService.initializeEndpoint).toHaveBeenCalled();
    expect(studentService.getEndpoint()).toEqual('students');
  });

  it('deve fazer a busca pela nome do aluno', (inject([HttpClient], (httpMocked: HttpClient) => {
    const http = httpMocked;

    spyOn(http, 'get').and.returnValue(of({}));

    studentService = TestBed.get(StudentService);

    const page = 122;
    const size = 30;
    const name = 'opa';
    const params = new HttpParams().set('name', name).set('page', page + '').set('size', size + '');
    studentService.findByNameContaining(name, page, size).subscribe();
    expect(http.get).toHaveBeenCalledWith(studentService.getUri(), { params: params });
  })));
});
