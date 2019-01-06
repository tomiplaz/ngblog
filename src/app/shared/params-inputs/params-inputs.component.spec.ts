import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ParamsInputsComponent } from './params-inputs.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('ParamsInputsComponent', () => {
  let component: ParamsInputsComponent;
  let fixture: ComponentFixture<ParamsInputsComponent>;

  beforeEach(async(() => {
    const routeStub = {};
    const routerStub = {
      navigate: () => {},
    };

    TestBed.configureTestingModule({
      declarations: [ ParamsInputsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Router, useValue: routerStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsInputsComponent);
    component = fixture.componentInstance;
  });

  describe('with no sort options input provided', () => {
    it('should throw error', () => {
      try {
        fixture.detectChanges();
      } catch (e) {
        expect(e.message).toBe(component.SORT_OPTIONS_REQUIRED);
      }
    });
  });

  describe('with sort options input provided', () => {
    beforeEach(() => {
      component.sortOptions = [];
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
