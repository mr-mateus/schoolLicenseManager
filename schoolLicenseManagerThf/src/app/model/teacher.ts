import { Person } from './Person';

export interface Teacher extends Person {
  id?: number;
  academicDegree: any;
}

export enum AcademicDegree {
  MESTRE,
  DOUTOR,
  PHD
}
