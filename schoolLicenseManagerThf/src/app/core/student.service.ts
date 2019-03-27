import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { CrudService } from './crud.service';

export const STUDENTS_URI = `students`;

export class StudentService extends CrudService<Student> {
  initializeEndpoint(): void {
    this.endpoint = STUDENTS_URI;
  }
  findByNameContaining(name: string, page: number, size: number): Observable<PageResponseEntity<Student>> {
    const params = new HttpParams().set('name', name).set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResponseEntity<Student>>(`${this.getUri()}`, { params: params });
  }
}
