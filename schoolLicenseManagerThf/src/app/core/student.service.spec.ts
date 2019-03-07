import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestModuleMetadata } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SetUpTestBed } from 'src/test.common.spec';
import { StudentService, STUDENTS_URI } from './student.service';

describe('StudentService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientTestingModule
    ],
    providers: [StudentService]
  };
  let studentService: StudentService;
  let http: HttpClient;
  SetUpTestBed(moduleDef);
  beforeAll((inject([StudentService, HttpClient], (_studentService: StudentService, _http: HttpClient) => {
    studentService = _studentService;
    http = _http;
  })));

  it('serviço deve ser criado', () => {
    expect(studentService).toBeTruthy();
  });

  it('deve chamar o serviço httpClient passando a url correta', async () => {
    spyOn(http, 'get').and.returnValue(of({}));
    studentService.getStudents();
    expect(http.get).toHaveBeenCalledWith(`${environment.apiUri}${STUDENTS_URI}`);

  });
});
