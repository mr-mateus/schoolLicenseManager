import { Person } from './Person';

export interface Teacher extends Person{
  academicDegree: AcademicDegree;
}

export enum AcademicDegree {
  MESTRE, DOUTOR, PHD
}
