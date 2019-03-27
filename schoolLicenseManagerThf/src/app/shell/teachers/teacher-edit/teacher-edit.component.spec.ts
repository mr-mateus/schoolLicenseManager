import { async, ComponentFixture, TestBed, TestModuleMetadata, fakeAsync, inject, tick } from '@angular/core/testing';

import { TeacherEditComponent } from './teacher-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ThfModule } from '@totvs/thf-ui';
import { TeacherService } from 'src/app/core/teacher.service';
import { SetUpTestBed } from 'src/test.common.spec';
import { Teacher, AcademicDegree } from 'src/app/model/teacher';
import { of, empty } from 'rxjs';

describe('TeacherEditComponent', () => {
  let component: TeacherEditComponent;
  let fixture: ComponentFixture<TeacherEditComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
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
    fixture = TestBed.createComponent(TeacherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve verificar o estado do formulário', fakeAsync(() => {
    spyOn<any>(component, 'subscribeFormState').and.callFake(() => { });
    component.ngOnInit();
    expect(component['subscribeFormState']).toHaveBeenCalled();
  }));

  it('deve chamar a abertura do modal para inserir um professor', fakeAsync(() => {
    spyOn<any>(component['thfModal'], 'open').and.callFake(() => { });
    component.openForInsert();
    expect(component['thfModal'].open).toHaveBeenCalled();
  }));

  it('deve chamar a abertura do modal para editar um professor', fakeAsync(() => {
    const teacher: Teacher = {
      id: 1,
      name: 'Eduardo',
      cpf: '01234567890',
      academicDegree: AcademicDegree.DOUTOR,
      email: 'eduardo@eduardo.com.br'
    }
    spyOn<any>(component, 'setTeacherForm').and.callFake(() => { });
    spyOn<any>(component['thfModal'], 'open').and.callFake(() => { });
    component.openForEdit(teacher);
    expect(component['thfModal'].open).toHaveBeenCalled();
    expect(component['setTeacherForm']).toHaveBeenCalledWith(teacher);
  }));

  it('deve chamar o serviço para criar o registro e fechar o modal',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacher: Teacher = {
        id: undefined,
        name: 'Eduardo',
        cpf: '01234567890',
        academicDegree: 'DOUTOR',
        email: 'eduardo@eduardo.com.br'
      };

      component['setTeacherForm'](teacher);
      const teacherForm = component['getTeacherFromForm']();

      spyOn<any>(component, 'getTeacherFromForm').and.callThrough();
      spyOn<any>(component, 'closeModal').and.callThrough();
      spyOn(component.teacherCreated, 'emit').and.callFake(() => { });

      fixture.detectChanges();
      spyOn(teacherService, 'create').and.returnValue(of(teacher));
      component.save();
      tick();
      fixture.detectChanges();
      expect(teacherService.create).toHaveBeenCalledWith(teacherForm);
      expect(component['getTeacherFromForm']).toHaveBeenCalledTimes(1);
      expect(component['closeModal']).toHaveBeenCalledTimes(1);
      expect(component.teacherCreated.emit).toHaveBeenCalledWith(teacher);
    })));

  it('deve chamar o serviço para atualizar o registro e fechar o modal',
    fakeAsync(inject([TeacherService], (teacherService: TeacherService) => {
      const teacher: Teacher = {
        id: 1,
        name: 'Eduardo',
        cpf: '01234567890',
        academicDegree: 'DOUTOR',
        email: 'eduardo@eduardo.com.br'
      };

      component['setTeacherForm'](teacher);
      const teacherForm = component['getTeacherFromForm']();

      spyOn<any>(component, 'getTeacherFromForm').and.callThrough();
      spyOn<any>(component, 'closeModal').and.callThrough();
      spyOn(component.teacherCreated, 'emit').and.callFake(() => { });

      fixture.detectChanges();
      spyOn(teacherService, 'update').and.returnValue(of(teacher));
      component.save();
      tick();
      fixture.detectChanges();
      expect(teacherService.update).toHaveBeenCalledWith(teacherForm);
      expect(component['getTeacherFromForm']).toHaveBeenCalledTimes(1);
      expect(component['closeModal']).toHaveBeenCalledTimes(1);
      expect(component.teacherCreated.emit).toHaveBeenCalledWith(teacher);
    })));

  it('deve chamar a função closeModal', () => {
    spyOn<any>(component, 'closeModal').and.callFake(() => { });
    component.cancel();
    expect(component['closeModal']).toHaveBeenCalledTimes(1);
  });

  it('deve chamar a função close para fechar o modal', () => {
    spyOn<any>(component['thfModal'], 'close').and.callFake(() => { });
    spyOn<any>(component, 'resetForm').and.callFake(() => { });
    component.cancel();
    expect(component['thfModal'].close).toHaveBeenCalledTimes(1);
    expect(component['resetForm']).toHaveBeenCalledTimes(1);
  });

  it('deve observar o formulário', () => {
    spyOn(component.teacherForm, 'statusChanges').and.callThrough();
    component['subscribeFormState']();
    expect(component.confirm.disabled).toBeTruthy();
  });

  it('botão de salvar deve ficar habilitado quando o formulário estiver valido', fakeAsync(() => {
    const teacher: Teacher = {
      id: 1,
      name: 'Eduardo',
      cpf: '01234567890',
      academicDegree: 'DOUTOR',
      email: 'eduardo@eduardo.com.br'
    };
    component.openForInsert();
    tick();
    expect(component.teacherForm.valid).toBeFalsy();
    component.teacherForm.controls['name'].setValue(teacher.name);
    component.teacherForm.controls['name'].markAsDirty();
    component.teacherForm.controls['cpf'].setValue(teacher.cpf);
    component.teacherForm.controls['academicDegree'].setValue(1);
    component.teacherForm.controls['email'].setValue(teacher.email);
    fixture.detectChanges();
    expect(component.teacherForm.valid).toBeTruthy();
    expect(component.confirm.disabled).toBeFalsy();
  }));

  it('botão de salvar deve ficar desabilitado quando o formulário estiver invalido', fakeAsync(() => {
    const teacher: Teacher = {
      id: 1,
      name: 'Eduardo',
      cpf: '01234567890',
      academicDegree: 'DOUTOR',
      email: 'eduardo@eduardo.com.br'
    };
    component.openForInsert();
    tick();
    expect(component.teacherForm.valid).toBeFalsy();
    component.teacherForm.controls['name'].setValue(teacher.name);
    component.teacherForm.controls['name'].markAsDirty();
    component.teacherForm.controls['cpf'].setValue(teacher.cpf);
    component.teacherForm.controls['academicDegree'].setValue(1);
    component.teacherForm.controls['email'].setValue(teacher.email);
    component.teacherForm.controls['name'].setValue('');
    fixture.detectChanges();
    expect(component.teacherForm.valid).toBeFalsy();
    expect(component.confirm.disabled).toBeTruthy();
  }));

  it('deve limpar os dados do formulário', fakeAsync(() => {
    const teacher: Teacher = {
      id: 1,
      name: 'Eduardo',
      cpf: '01234567890',
      academicDegree: 'DOUTOR',
      email: 'eduardo@eduardo.com.br'
    };
    component.openForInsert();
    tick();
    expect(component.teacherForm.valid).toBeFalsy();
    component.teacherForm.controls['name'].setValue(teacher.name);
    component.teacherForm.controls['cpf'].setValue(teacher.cpf);
    component.teacherForm.controls['academicDegree'].setValue(1);
    component.teacherForm.controls['email'].setValue(teacher.email);
    component.teacherForm.controls['name'].markAsDirty();
    fixture.detectChanges();
    expect(component.teacherForm.dirty).toBeTruthy();
    component['resetForm']();
    fixture.detectChanges();
    expect(component.teacherForm.dirty).toBeFalsy();
  }));

  it('deve setar um professor no formulário', fakeAsync(() => {
    spyOn(component.teacherForm, 'patchValue').and.callFake(() => { });
    spyOn<any>(component, 'transformEnumToAcademicDegreeRadioOption').and.callFake(() => { });
    const teacher: Teacher = {
      id: 1,
      name: 'Eduardo',
      cpf: '01234567890',
      academicDegree: 'DOUTOR',
      email: 'eduardo@eduardo.com.br'
    };
    component['setTeacherForm'](teacher);
    fixture.detectChanges();
    tick();
    expect(component.teacherForm.patchValue).toHaveBeenCalledTimes(1);
    expect(component['transformEnumToAcademicDegreeRadioOption']).toHaveBeenCalledTimes(1);
  }));

  it('deve converter uma string em um valor para o options do THF', () => {
    let academicDegree = component['transformEnumToAcademicDegreeRadioOption']('MESTRE');
    expect(academicDegree).toEqual(1);
    academicDegree = component['transformEnumToAcademicDegreeRadioOption']('DOUTOR');
    expect(academicDegree).toEqual(2);
    academicDegree = component['transformEnumToAcademicDegreeRadioOption']('PHD');
    expect(academicDegree).toEqual(3);
  });

  it('deve chamar o método cancel', () => {
    spyOn<any>(component, 'cancel').and.callFake(() => { });
    component.close.action();
    expect(component['cancel']).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o método save', () => {
    spyOn<any>(component, 'save').and.callFake(() => { });
    component.confirm.action();
    expect(component['save']).toHaveBeenCalledTimes(1);
  });
});
