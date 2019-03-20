import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfRadioGroupOption } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TeacherService } from 'src/app/core/teacher.service';
import { AcademicDegree, Teacher } from 'src/app/model/teacher';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit, OnDestroy {
  @ViewChild(ThfModalComponent)
  private thfModal: ThfModalComponent;

  @Output() teacherCreated = new EventEmitter<Teacher>();

  private destroy: Subject<void> = new Subject();


  teacherForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required],
    academicDegree: ['', Validators.required],
  });

  readonly academicDegreeOptions: Array<ThfRadioGroupOption> = [
    { label: 'MESTRE', value: 1 },
    { label: 'DOUTOR', value: 2 },
    { label: 'PHD', value: 3 }
  ];

  close: ThfModalAction = {
    action: () => {
      this.cancel();
    },
    label: 'Cancelar'
  };

  confirm: ThfModalAction = {
    action: () => {
      this.save();
    },
    label: 'Salvar',
    disabled: true
  };

  constructor(private teacherService: TeacherService, private fb: FormBuilder) { }

  ngOnInit() {
    this.checkFormValid();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openForInsert(): void {
    this.thfModal.open();
  }

  openForEdit(teacher: Teacher): void {
    this.setTeacherForm(teacher);
    this.thfModal.open();
  }

  save(): void {
    const teacher = this.teacherForm.value as Teacher;
    // necessário para trabalhar com o thf-select, que não permite o valor 0 por default.
    teacher.academicDegree = teacher.academicDegree - 1;
    if (teacher.id) {
      this.teacherService.update(teacher)
        .pipe(takeUntil(this.destroy))
        .subscribe(teacherCreated => {
          this.closeModal();
          this.teacherCreated.emit(teacherCreated);
        });
    } else {
      this.teacherService.create(teacher)
        .pipe(takeUntil(this.destroy))
        .subscribe(teacherCreated => {
          this.closeModal();
          this.teacherCreated.emit(teacherCreated);
        });
    }
  }

  cancel(): void {
    this.closeModal();
  }

  private closeModal() {
    this.thfModal.close();
    this.resetForm();
  }

  private checkFormValid(): void {
    this.teacherForm.statusChanges
      .pipe(
        takeUntil(this.destroy))
      .subscribe(() => {
        this.confirm.disabled = this.teacherForm.pristine || this.teacherForm.invalid;
      });
  }

  private resetForm(): void {
    this.teacherForm.reset();
    this.teacherForm.controls['academicDegree'].markAsPristine();
  }

  private setTeacherForm(teacher: Teacher) {
    this.teacherForm.patchValue({
      id: teacher.id,
      name: teacher.name,
      cpf: teacher.cpf,
      email: teacher.email,
      academicDegree: this.transformEnumToAcademicDegreeRadioOption(teacher.academicDegree)
    });
  }

  private transformEnumToAcademicDegreeRadioOption(academicDegree: AcademicDegree): number {
    /*devido a limiteção do THF, enum em tela, o ThfSelect deve começar com o valor 1
    * necessário transformar para o valor que a entidade no banco de dados aceite
    */
    switch (academicDegree.toString()) {
      case 'MESTRE':
        return 1;

      case 'DOUTOR':
        return 2;

      case 'PHD':
        return 3;
    }
  }
}
