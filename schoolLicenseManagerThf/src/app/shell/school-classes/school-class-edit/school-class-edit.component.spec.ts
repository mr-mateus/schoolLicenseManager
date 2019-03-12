import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassEditComponent } from './school-class-edit.component';

describe('SchoolClassEditComponent', () => {
  let component: SchoolClassEditComponent;
  let fixture: ComponentFixture<SchoolClassEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
