import { Injectable } from '@angular/core';
import { SchoolClass } from '../model/schoolClass';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { environment } from 'src/environments/environment';
export const SCHOOL_CLASS_URI = `${environment.apiUri}/api/schoolClasses`;
@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  constructor(private http: HttpClient) { }

  findAll(page: string, size: string): Observable<PageResponseEntity<SchoolClass>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<SchoolClass>>(`${SCHOOL_CLASS_URI}`, { params: params });
  }

  findById(id: string): Observable<SchoolClass> {
    return this.http.get<SchoolClass>(`${SCHOOL_CLASS_URI}/${id}`);
  }

  findByDescriptionContaining(description: string, page: string, size: string): Observable<PageResponseEntity<SchoolClass>> {
    const params = new HttpParams().set('description', description).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<SchoolClass>>(`${SCHOOL_CLASS_URI}`, { params: params });
  }

  create(schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.http.post<SchoolClass>(`${SCHOOL_CLASS_URI}`, schoolClass);
  }

  update(schoolClass: SchoolClass): Observable<SchoolClass> {
    return this.http.put<SchoolClass>(`${SCHOOL_CLASS_URI}`, schoolClass);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${SCHOOL_CLASS_URI}/${id}`);
  }
}
