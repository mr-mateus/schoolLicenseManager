import { browser, $$, $, ElementFinder } from 'protractor';
import { Student } from 'src/app/model/student';
import { SchoolClass } from 'src/app/model/schoolClass';
import { SchoolClassFormPage } from './schoolClassForm.po';
import { Discipline } from 'src/app/model/discipline';
import { StudentFormPage } from '../students/studentForm.po';

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

  async createSchoolClass(schoolClass: SchoolClass) {
    const schoolClassFormPage = new SchoolClassFormPage();
    await schoolClassFormPage.description().sendKeys(schoolClass.description);
    await schoolClassFormPage.period().sendKeys(schoolClass.period);
    await schoolClassFormPage.year().sendKeys(schoolClass.year);
    await schoolClassFormPage.vacancies().sendKeys(schoolClass.vacancies);
  }

  async addDiscipline(disciplines: Array<number>) {
    await $('#disciplines thf-button button.thf-button-primary').click();
    await disciplines.forEach(number => {
       $$('label').get(number).click();
    });
    await $('thf-modal .thf-button-modal-first-action button').click();
  }

  async createDiscipline(discipline: Discipline, teacherComboLine: number) {
    await $('#disciplines [t-type=default] button').click();
    await $('thf-modal [formcontrolname=description] input').sendKeys(discipline.description);
    await $('thf-modal [formcontrolname=initials] input').sendKeys(discipline.initials);
    await $('thf-modal [formcontrolname=workload] input').sendKeys(discipline.workload);
    await $('.thf-select-button').click();
    await $$('.thf-select-item').get(teacherComboLine).click();
    await $('thf-modal .thf-button-modal-first-action button').click();
  }

  async addStudents(students: Array<number>) {
    await $('#students thf-button button.thf-button-primary').click();
    await students.forEach(number => {
      $$('label').get(number).click();
    });
    await $('thf-modal .thf-button-modal-first-action button').click();
  }

  async createStudent(student: Student) {
    const studentFormPage = new StudentFormPage();
    await studentFormPage.name().sendKeys(student.name);
    await studentFormPage.cpf().sendKeys(student.cpf);
    await studentFormPage.email().sendKeys(student.email);
    await studentFormPage.chooseStudentType(student.studentType);
    await studentFormPage.save().click();
  }



  async openForEditStudent(tableLine: number) {
  }

  async deleteStudent(tableLine: number) {
  }
}
