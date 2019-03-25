import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { of } from 'rxjs';
import { SetUpTestBed } from 'src/test.common.spec';
import { CrudService } from './crud.service';


export class Teste extends CrudService<string> {
  initializeEndpoint(): void {
    this.endpoint = 'teste';
  }
}

fdescribe('CrudService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [Teste]
  };
  SetUpTestBed(moduleDef);
  let teste: Teste;
  let http: HttpClient;
  beforeAll((inject([HttpClient], (httpMocked: HttpClient) => {
    http = httpMocked;
  })));

  describe('instancia do objeto', () => {
    it('deve inicializar o endpoint chamando o método initializeEndpoint', () => {
      spyOn(Teste.prototype, 'initializeEndpoint').and.callThrough();
      teste = TestBed.get(Teste);
      expect(teste.initializeEndpoint).toHaveBeenCalled();
      expect(teste.getEndpoint()).toEqual('teste');
    });

    it('deve lançar uma exceção quando a propriedade estiver em branco', () => {
      spyOn(Teste.prototype, 'initializeEndpoint').and.callThrough();
      teste = TestBed.get(Teste);
      teste['endpoint'] = '';
      expect(() => { teste.getEndpoint(); }).toThrowError();
    });

    it('deve lançar uma exceção quando a propriedade estiver em undefined', () => {
      spyOn(Teste.prototype, 'initializeEndpoint').and.callThrough();
      teste = TestBed.get(Teste);
      teste['endpoint'] = undefined;
      expect(() => { teste.getEndpoint(); }).toThrowError();
    });

    it('deve retornar a uri criado para a requisição', () => {
      teste = TestBed.get(Teste);
      teste['endpoint'] = `teste`;
      expect(teste.getUri()).toEqual('/api/teste');
    });
  });


  describe('requisições', () => {
    SetUpTestBed(moduleDef);
    beforeAll((inject([HttpClient], (httpMocked: HttpClient) => {
      http = httpMocked;
    })));

    it('deve buscar todos os registros usando paginação utilizando o método get', () => {
      spyOn(http, 'get').and.returnValue(of({}));
      teste = TestBed.get(Teste);
      const page = 100;
      const size = 20;
      const params = new HttpParams().set('page', page + '').set('size', size + '');
      teste.findAllPaging(page + '', size + '').subscribe();
      expect(http.get).toHaveBeenCalledWith('/api/teste', { params: params });
    });

    it('deve buscar todos os registros usando id utilizando o método get', () => {
      spyOn(http, 'get').and.returnValue(of({}));
      teste = TestBed.get(Teste);
      const testeId = 120;
      teste.findById(testeId);
      expect(http.get).toHaveBeenCalledWith(`/api/teste/${testeId}`);
    });

    it('deve chamar o método post para criar o registro', () => {
      spyOn(http, 'post').and.returnValue(of({}));
      teste = TestBed.get(Teste);
      const testText = 'teste';
      teste.create(testText);
      expect(http.post).toHaveBeenCalledWith(`/api/teste`, testText);
    });

    it('deve chamar o método put para atualizar o registro', () => {
      spyOn(http, 'put').and.returnValue(of({}));
      teste = TestBed.get(Teste);
      const testText = 'teste';
      teste.update(testText);
      expect(http.put).toHaveBeenCalledWith(`/api/teste`, testText);
    });

    it('deve chamar o método delete para eliminar o registro', () => {
      spyOn(http, 'delete').and.returnValue(of({}));
      teste = TestBed.get(Teste);
      const testeId = 120;
      teste.delete(testeId);
      expect(http.delete).toHaveBeenCalledWith(`/api/teste/${testeId}`);
    });
  });
});
