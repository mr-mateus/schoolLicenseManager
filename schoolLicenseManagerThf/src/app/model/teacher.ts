import { Person } from './Person';

export interface Teacher extends Person {
  id?: number;
  academicDegree: AcademicDegree;
}

export enum AcademicDegree {
  MESTRE, DOUTOR, PHD
}
