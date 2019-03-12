import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { Discipline } from '../model/discipline';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const DISCIPLINES_URI = `${environment.apiUri}/api/disciplines`;
@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http: HttpClient) { }

  findAll(page: string, size: string): Observable<PageResponseEntity<Discipline>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Discipline>>(`${DISCIPLINES_URI}`, { params: params });
  }

  findById(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`${environment.apiUri}${DISCIPLINES_URI}/${id}`);
  }

  findByInitialsContaining(initials: string, page: string, size: string): Observable<PageResponseEntity<Discipline>> {
    const params = new HttpParams().set('name', initials).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Discipline>>(`${DISCIPLINES_URI}`, { params: params });
  }

  create(discipline: Discipline): Observable<Discipline> {
    return this.http.post<Discipline>(`${DISCIPLINES_URI}`, discipline);
  }

  update(discipline: Discipline): Observable<Discipline> {
    return this.http.put<Discipline>(`${DISCIPLINES_URI}`, discipline);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${DISCIPLINES_URI}/${id}`);
  }
}
