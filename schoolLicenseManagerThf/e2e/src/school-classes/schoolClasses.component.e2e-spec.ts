import { protractor } from 'protractor/built/ptor';
import { SchoolClassesPage } from './schoolClasses.po';
import { SchoolClass } from 'src/app/model/schoolClass';
import { browser, $ } from 'protractor';
import { SchoolClassFormPage } from './schoolClassForm.po';
import { Discipline } from 'src/app/model/discipline';
import { StudentsPage } from '../students/students.po';
import { Student } from 'src/app/model/student';

const schoolClassesPage: SchoolClassesPage = new SchoolClassesPage();
const schoolClassFormPage: SchoolClassFormPage = new SchoolClassFormPage();
fdescribe('Turmas', () => {
  beforeAll(async () => {
    await schoolClassesPage.navigateTo();
  });

  it('deve mostrar o resultado com a lista de turmas cadastradas', async () => {
    const tableLines = await schoolClassesPage.totalTableLines();
    expect(tableLines.length).toEqual(10);
  });

  it('deve carregar mais turmas', async () => {
    let tableLines = await schoolClassesPage.totalTableLines();
    expect(tableLines.length).toEqual(10);
    await schoolClassesPage.buttonShowMore().click();
    tableLines = await schoolClassesPage.totalTableLines();
    expect(tableLines.length).toEqual(18);
  });

  it('deve filtrar pela descrição', async () => {
    const filter = schoolClassesPage.filter();
    await filter.sendKeys('historia');
    await filter.sendKeys(protractor.Key.ENTER);
    const tableLines = await schoolClassesPage.totalTableLines();
    expect(tableLines.length).toEqual(1);
  });

  it('deve adicionar uma turma sem alunos e sem disciplinas', async () => {
    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 20
    };
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');
    await schoolClassesPage.createSchoolClass(schooClass);
    const filter = await schoolClassesPage.filter().getAttribute('value');
    expect(filter).toEqual(schooClass.description);
    const tableLines = await schoolClassesPage.totalTableLines();
    expect(tableLines.length).toEqual(1);
    await schoolClassFormPage.save().click();
  });

  it('deve adicionar uma turma apenas com disciplinas', async () => {
    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 20
    };
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');
    await schoolClassesPage.createSchoolClass(schooClass);
    await schoolClassesPage.addDiscipline([0, 1, 2]);
    await schoolClassFormPage.save().click();
  });

  it('deve adicionar uma turma apenas com alunos', async () => {
    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 20
    };
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');
    await schoolClassesPage.createSchoolClass(schooClass);
    await schoolClassesPage.addStudents([0, 1, 2]);
    await schoolClassFormPage.save().click();
  });

  it('deve adicionar uma turma com alunos e estudantes', async () => {
    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 20
    };
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');
    await schoolClassesPage.createSchoolClass(schooClass);
    await schoolClassesPage.addDiscipline([0, 1, 2]);
    await schoolClassesPage.addStudents([0, 1, 2]);
    await schoolClassFormPage.save().click();
  });

  it('deve não deve permitir cadastrar mais alunos que vagas', async () => {
    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 2
    };
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');
    await schoolClassesPage.createSchoolClass(schooClass);
    await schoolClassesPage.addDiscipline([0, 1, 2]);
    await schoolClassesPage.addStudents([0, 1, 2]);
    await schoolClassFormPage.save().click();
    await browser.sleep(2000);
    const url = await browser.getCurrentUrl();
    expect(url).toEqual('http://localhost:4200/schoolClasses/schoolClass/');
  });

  it('deve criar uma nova disciplina enquanto cadastra uma turma', async () => {
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');

    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 2
    };

    await schoolClassesPage.createSchoolClass(schooClass);
    const discipline: Discipline = {
      description: 'teste',
      initials: 't',
      workload: 50
    }
    await schoolClassesPage.createDiscipline(discipline, 0);
    await schoolClassFormPage.save().click();
  });

  fit('deve criar um novo aluno enquanto cadastra uma turma', async () => {
    await browser.get('http://localhost:4200/schoolClasses/schoolClass');

    const schooClass: SchoolClass = {
      description: 'nova turma',
      period: 5,
      year: 2019,
      vacancies: 2
    };

    await schoolClassesPage.createSchoolClass(schooClass);
    const student: Student = {
      name: 'aluno teste',
      cpf: '01234569870',
      email: 'aluno@teste.com.br',
      studentType: 'enade'
    };
    await $('#students [t-type=default] button').click();
    await schoolClassesPage.createStudent(student);
    await schoolClassFormPage.save().click();
  });
});

