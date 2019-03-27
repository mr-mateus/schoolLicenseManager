import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { inject, TestModuleMetadata } from '@angular/core/testing';
import { FormUtil } from './formUtil';
import { SetUpTestBed } from 'src/test.common.spec';

describe('FormUtil', () => {
  const moduleDef: TestModuleMetadata = {
    providers: [FormBuilder]
  };
  SetUpTestBed(moduleDef);

  it('quando o formulário estiver válido deve retornar true', (inject([FormBuilder], (fb: FormBuilder) => {
    const form = fb.group({
      id: ['', Validators.required]
    });
    form.controls['id'].setValue('teste');
    expect(FormUtil.validate(form)).toBeTruthy();
  })));

  it('quando o formulário deve lançar uma exceção quando estiver inválido', (inject([FormBuilder], (fb: FormBuilder) => {
    const form = fb.group({
      id: ['', Validators.required]
    });

    form.controls['id'].setValue('');

    expect(() => { FormUtil.validate(form); }).toThrowError();
    expect(form.controls['id'].dirty).toBeTruthy();
  })));
});
