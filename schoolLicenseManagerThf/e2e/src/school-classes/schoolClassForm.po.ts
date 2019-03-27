import { $, ElementFinder } from 'protractor';

export class SchoolClassFormPage {


  description(): ElementFinder {
    return $('[formcontrolname=description] input');
  }

  year(): ElementFinder {
    return $('[formcontrolname=year] input');
  }

  period(): ElementFinder {
    return $('[formcontrolname=period] input');
  }

  vacancies(): ElementFinder {
    return $('[formcontrolname=vacancies] input');
  }

  save() {
    return $('.thf-page-header-actions thf-button button.thf-button-primary');
  }
}
