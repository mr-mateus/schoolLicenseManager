import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { Teacher } from '../model/teacher';
import { CrudService } from './crud.service';

export const TEACHER_URI = `teachers`;
@Injectable({
  providedIn: 'root'
})
export class TeacherService extends CrudService<Teacher> {
  initializeEndpoint(): void {
    this.endpoint = TEACHER_URI;
  }

  findByNameContaining(name: string, page: string, size: string): Observable<PageResponseEntity<Teacher>> {
    const params = new HttpParams().set('name', name).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Teacher>>(`${this.getUri()}`, { params: params });
  }
}
