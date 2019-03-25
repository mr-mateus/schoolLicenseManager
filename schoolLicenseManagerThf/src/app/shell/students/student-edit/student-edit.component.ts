import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfRadioGroupOption } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentService } from 'src/app/core/student.service';
import { Student, StudentType } from 'src/app/model/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit, OnDestroy {

  @ViewChild(ThfModalComponent)
  private thfModal: ThfModalComponent;

  @Output() studentCreated = new EventEmitter<Student>();

  studentForm = this.fb.group({
    enrollment: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required],
    studentType: ['', Validators.required],
  });

  readonly studentTypeOptions: Array<ThfRadioGroupOption> = [
    { label: 'ENADE', value: 1 },
    { label: 'VESTIBULAR', value: 2 }
  ];
  private destroy: Subject<void> = new Subject();

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
    label: 'Salvar'
  };

  constructor(private studentService: StudentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.checkFormValid();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openForCreate(): void {
    this.thfModal.open();
  }

  openForEdit(student: Student): void {
    this.setStudentForm(student);
    this.thfModal.open();
  }

  save(): void {
    const student: Student = {
      cpf: this.studentForm.controls['cpf'].value,
      studentType: this.studentForm.controls['studentType'].value,
      email: this.studentForm.controls['email'].value,
      name: this.studentForm.controls['name'].value
    };
    // necessário para trabalhar com o thf-select, que não permite o valor 0 por default.
    student.studentType = student.studentType - 1;
    if (student.enrollment) {
      this.studentService.update(student)
        .pipe(takeUntil(this.destroy))
        .subscribe(studentCreated => {
          this.closeModal();
          this.studentCreated.emit(studentCreated);
        });
    } else {
      this.studentService.create(student)
        .pipe(takeUntil(this.destroy))
        .subscribe(studentCreated => {
          this.closeModal();
          this.studentCreated.emit(studentCreated);
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
    this.studentForm.statusChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.confirm.disabled = this.studentForm.pristine || this.studentForm.invalid;
    });
  }

  private resetForm(): void {
    this.studentForm.reset();
    this.studentForm.controls['studentType'].markAsPristine();
  }

  private setStudentForm(student: Student) {
    this.studentForm.patchValue({
      enrollment: student.enrollment,
      name: student.name,
      cpf: student.cpf,
      email: student.email,
      studentType: student.studentType.toString() === 'ENADE' ? 1 : 2
    });
  }
}
