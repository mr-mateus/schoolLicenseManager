import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';

export const STUDENTS_URI = `${environment.apiUri}/api/students`;
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  findAll(page: string, size: string): Observable<PageResponseEntity<Student>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Student>>(`${STUDENTS_URI}`, { params: params });
  }

  findById(id: string): Observable<Student> {
    return this.http.get<Student>(`${environment.apiUri}${STUDENTS_URI}/${id}`);
  }

  findByNameContaining(name: string, page: string, size: string): Observable<PageResponseEntity<Student>> {
    const params = new HttpParams().set('name', name).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Student>>(`${STUDENTS_URI}`, { params: params });
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(`${STUDENTS_URI}`, student);
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${STUDENTS_URI}`, student);
  }

  delete(enrollment: string): Observable<void> {
    return this.http.delete<void>(`${STUDENTS_URI}/${enrollment}`);
  }
}
