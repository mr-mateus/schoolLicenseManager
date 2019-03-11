import { FormGroup } from '@angular/forms';

export class FormUtil {
  static validate(form: FormGroup): boolean {
    if (!form.valid) {
      for (const x in form.controls) {
        if (form.controls[x]) {
          form.controls[x].markAsDirty({ onlySelf: true });
        }
      }
      throw Error('Formulário não foi preenchido corretamente');
    }
    return true;
  }
}
