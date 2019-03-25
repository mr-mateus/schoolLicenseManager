import { Discipline } from '../model/discipline';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';
import { HttpParams } from '@angular/common/http';

export const DISCIPLINES_URI = `disciplines`;

export class DisciplineService extends CrudService<Discipline> {

  initializeEndpoint(): void {
    this.endpoint = DISCIPLINES_URI;
  }

  findByInitialsContaining(initials: string, page: string, size: string): Observable<PageResponseEntity<Discipline>> {
    const params = new HttpParams().set('name', initials).set('page', page).set('size', size);
    return this.http.get<PageResponseEntity<Discipline>>(`${this.getUri()}`, { params: params });
  }

}
