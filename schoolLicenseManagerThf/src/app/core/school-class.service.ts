import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { SchoolClass } from '../model/schoolClass';
import { CrudService } from './crud.service';

export const SCHOOL_CLASS_URI = `schoolClasses`;

export class SchoolClassService extends CrudService<SchoolClass> {
  initializeEndpoint(): void {
    this.endpoint = SCHOOL_CLASS_URI;
  }

  findByDescriptionContaining(description: string, page: string, size: string): Observable<PageResponseEntity<SchoolClass>> {
    const params = new HttpParams().set('description', description).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<SchoolClass>>(`${this.getUri()}`, { params: params });
  }

  getEmptySchoolClass() {
    const schoolClass: SchoolClass = {
      description: null,
      period: null,
      vacancies: null,
      year: null
    }
    return schoolClass;

  }
}
