import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassListComponent } from './school-class-list.component';

describe('SchoolClassListComponent', () => {
  let component: SchoolClassListComponent;
  let fixture: ComponentFixture<SchoolClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
