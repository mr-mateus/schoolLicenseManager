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

  findByNameContaining(name: string, page: string, size: string): Observable<PageResponseEntity<Teacher>> {
    const params = new HttpParams().set('name', name).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Teacher>>(`${TEACHER_URI}`, { params: params });
  }
}
