import { Teacher } from './teacher';

export class Discipline {
  id?: number;
  description: string;
  initials: string;
  workload: number;
  teacher?: Teacher;

}
