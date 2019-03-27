import { browser, $$, $, ElementFinder } from 'protractor';
import { Student } from 'src/app/model/student';

export class SchoolClassesPage {
  async navigateTo() {
    await browser.get('http://localhost:4200/schoolClasses');
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
  }

  async openForEditStudent(tableLine: number) {
  }

  async deleteStudent(tableLine: number) {
  }
}
