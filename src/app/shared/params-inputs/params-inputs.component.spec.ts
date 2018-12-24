import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsInputsComponent } from './params-inputs.component';

describe('ParamsInputsComponent', () => {
  let component: ParamsInputsComponent;
  let fixture: ComponentFixture<ParamsInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
