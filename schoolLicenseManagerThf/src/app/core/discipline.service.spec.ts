import { TestBed } from '@angular/core/testing';

import { DisciplineService } from './discipline.service';

describe('DisciplineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisciplineService = TestBed.get(DisciplineService);
    expect(service).toBeTruthy();
  });
});
