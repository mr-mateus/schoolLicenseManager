import { Discipline } from './discipline';
import { Student } from './student';

export interface SchoolClass {
  id?: number;
  description: string;
  year: number;
  period: number;
  vacancies: number;
  disciplines?: Array<Discipline>;
  students?: Array<Student>;

}
