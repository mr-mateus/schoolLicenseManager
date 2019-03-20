import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOfSchoolClassComponent } from './student-of-school-class.component';

describe('StudentOfSchoolClassComponent', () => {
  let component: StudentOfSchoolClassComponent;
  let fixture: ComponentFixture<StudentOfSchoolClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOfSchoolClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOfSchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
