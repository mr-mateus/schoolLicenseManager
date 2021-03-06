import { TestBed, async, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ThfToolbarModule, ThfMenuModule } from '@totvs/thf-ui';

import { AppComponent } from './app.component';
import { SetUpTestBed } from 'src/test.common.spec';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const moduleDef: TestModuleMetadata = {
    declarations: [
      AppComponent
    ],
    imports: [
      RouterTestingModule.withRoutes([])
    ]
  };

  SetUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
