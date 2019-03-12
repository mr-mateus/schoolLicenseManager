import { TestBed } from '@angular/core/testing';

import { SchoolClassService } from './school-class.service';

describe('SchoolClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolClassService = TestBed.get(SchoolClassService);
    expect(service).toBeTruthy();
  });
});
