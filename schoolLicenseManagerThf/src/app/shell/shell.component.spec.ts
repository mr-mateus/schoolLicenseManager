import { TestBed, async, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SetUpTestBed } from 'src/test.common.spec';
import { ShellComponent } from './shell.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ThfModule } from '@totvs/thf-ui';
import { By } from '@angular/platform-browser';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ShellComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      ShellComponent
    ],
    imports: [
      ThfModule,
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

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve instanciar o component', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os 5 menus', () => {
    const thfMenu = debugElement.queryAll(By.css('thf-menu div nav div div div thf-menu-item a'));
    expect(thfMenu.length).toEqual(5);
  });

});
