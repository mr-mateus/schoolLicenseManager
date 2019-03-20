import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineNotInSchoolClassComponent } from './discipline-not-in-school-class.component';

describe('DisciplineNotInSchoolClassComponent', () => {
  let component: DisciplineNotInSchoolClassComponent;
  let fixture: ComponentFixture<DisciplineNotInSchoolClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineNotInSchoolClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineNotInSchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
