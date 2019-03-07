import { TestBed, async, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SetUpTestBed } from 'src/test.common.spec';
import { ShellComponent } from './shell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      ShellComponent
    ],
    imports: [
      RouterTestingModule.withRoutes([])
    ],
    schemas: [NO_ERRORS_SCHEMA]
  };

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
