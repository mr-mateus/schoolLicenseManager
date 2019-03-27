import { browser, $$, $, ElementFinder } from 'protractor';
import { IfStmt } from '@angular/compiler';
import { Student } from 'src/app/model/student';

export class StudentFormPage {


  name(): ElementFinder {
    return $('[formcontrolname=name] input');
  }

  cpf(): ElementFinder {
    return $('[formcontrolname=cpf] input');
  }

  email(): ElementFinder {
    return $('[formcontrolname=email] input');
  }

  async chooseStudentType(type: string) {
    if (type.toLowerCase().trim() === 'enade') {
      await $$('.thf-radio-group-label').get(0).click();
    } else {
      await $$('.thf-radio-group-label').get(1).click();
    }
  }

  save() {
    return $('.thf-button-modal-first-action button');
  }
}
