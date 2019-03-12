import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassTableComponent } from './school-class-table.component';

describe('SchoolClassTableComponent', () => {
  let component: SchoolClassTableComponent;
  let fixture: ComponentFixture<SchoolClassTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
