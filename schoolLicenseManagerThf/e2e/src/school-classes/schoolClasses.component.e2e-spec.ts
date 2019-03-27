import { protractor } from 'protractor/built/ptor';
import { SchoolClassesPage } from './schoolClasses.po';

const schoolClassesPage: SchoolClassesPage = new SchoolClassesPage();

fdescribe('Alunos', () => {
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
});
