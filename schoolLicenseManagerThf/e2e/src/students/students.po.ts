import { browser, $$, $, ElementFinder } from 'protractor';
import { Student } from 'src/app/model/student';
import { StudentFormPage } from './studentForm.po';

export class StudentsPage {
  async navigateTo() {
    await browser.get('http://localhost:4200/students');
  }

  async totalTableLines() {
    return await $$('tbody tr');
  }

  filter(): ElementFinder {
    return $('.thf-page-list-operations input');
  }

  buttonShowMore(): ElementFinder {
    return $('.thf-table-footer-show-more thf-button button');
  }

  buttonAdd(): ElementFinder {
    return $('.thf-page-list-actions thf-button button');
  }

  notDataMessage(): ElementFinder {
    return $('.thf-table-no-data');
  }

  async createStudent(student: Student) {
    const studentFormPage = new StudentFormPage();
    await this.buttonAdd().click();
    await studentFormPage.name().sendKeys(student.name);
    await studentFormPage.cpf().sendKeys(student.cpf);
    await studentFormPage.email().sendKeys(student.email);
    await studentFormPage.chooseStudentType(student.studentType);
    await studentFormPage.save().click();
  }

  async openForEditStudent(tableLine: number) {
    await $$('td.thf-table-column-actions ').get(tableLine).$('span').click();
    await $('.thf-icon-edit').click();
  }

  async deleteStudent(tableLine: number) {
    await $$('td.thf-table-column-actions ').get(tableLine).$('span').click();
    await $('.thf-icon-delete').click();
    await $('.thf-modal .thf-button-modal-first-action button').click();
  }
}
