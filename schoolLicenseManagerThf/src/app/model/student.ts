import { Person } from './Person';

export interface Student extends Person {

  enrollment?: String;
  studentType: StudentType;
}

export enum StudentType {
  ENADE,
  VESTIBULAR
}
