import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';
import { Observable } from 'rxjs';

export const STUDENTS_URI = '/api/students';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(`${environment.apiUri}${STUDENTS_URI}`);
  }
}
