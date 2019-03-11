import { Person } from './Person';

export interface Student extends Person {

  enrollment?: string;
  studentType: StudentType;
}

export enum StudentType {
  ENADE,
  VESTIBULAR
}
