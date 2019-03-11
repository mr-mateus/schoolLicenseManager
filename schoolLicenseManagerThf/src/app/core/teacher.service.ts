import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { Teacher } from '../model/teacher';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const TEACHER_URI = `${environment.apiUri}/api/teachers`;
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  findAll(page: string, size: string): Observable<PageResponseEntity<Teacher>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Teacher>>(`${TEACHER_URI}`, { params: params });
  }

  findById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${TEACHER_URI}/${id}`);
  }

  findByNameContaining(name: string, page: string, size: string): Observable<PageResponseEntity<Teacher>> {
    const params = new HttpParams().set('name', name).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Teacher>>(`${TEACHER_URI}`, { params: params });
  }

  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${TEACHER_URI}`, teacher);
  }

  update(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${TEACHER_URI}`, teacher);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${TEACHER_URI}/${id}`);
  }
}
