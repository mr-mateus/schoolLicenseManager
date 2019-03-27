import { StudentsPage } from './students.po';
import { browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { StudentFormPage } from './studentForm.po';
import { Student } from 'src/app/model/student';

const studentsPage: StudentsPage = new StudentsPage();
const studentFormPage: StudentFormPage = new StudentFormPage();

describe('Alunos', () => {
  beforeAll(async () => {
    await studentsPage.navigateTo();
  });

  it('deve mostrar o resultado com a lista de alunos cadastradas', async () => {
    const tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(10);
  });

  it('deve carregar mais alunos', async () => {
    let tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(10);
    await studentsPage.buttonShowMore().click();
    tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(20);
  });

  it('deve filtrar pelo nome', async () => {
    const filter = studentsPage.filter();
    await filter.sendKeys('jo');
    await filter.sendKeys(protractor.Key.ENTER);
    const tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(3);
  });

  it('deve adicionar um aluno', async () => {
    const student: Student = {
      name: 'eduardo zmorvirzkynk',
      cpf: '01234569870',
      email: 'eduardo@zmorvirzkynk.com.br',
      studentType: 'enade'
    };
    await studentsPage.createStudent(student);
    const filter = await studentsPage.filter().getAttribute('value');
    expect(filter).toEqual(student.name);
    const tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(1);
  });

  it('deve editar um aluno', async () => {
    const editedName = 'nome alterado';

    await studentsPage.navigateTo();

    await studentsPage.openForEditStudent(1);

    await studentFormPage.name().clear();
    await studentFormPage.name().sendKeys(editedName);

    await studentFormPage.save().click();

    const filter = await studentsPage.filter().getAttribute('value');

    expect(filter).toEqual(editedName);

    const tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(1);

  });

  it('deve eliminar um aluno', async () => {
    await studentsPage.deleteStudent(0);
    const filter = await studentsPage.filter().getAttribute('value');
    expect(filter).toEqual('Jose');
    const tableLines = await studentsPage.totalTableLines();
    expect(tableLines.length).toEqual(1);
    expect(studentsPage.notDataMessage().isDisplayed()).toBeTruthy();
  });
});
