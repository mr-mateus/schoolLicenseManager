import { Person } from './Person';

export interface Student extends Person {

  enrollment?: string;
  studentType: any;
}

export enum StudentType {
  ENADE,
  VESTIBULAR
}
