import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineFormComponent } from './discipline-form.component';

describe('DisciplineFormComponent', () => {
  let component: DisciplineFormComponent;
  let fixture: ComponentFixture<DisciplineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
