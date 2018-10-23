import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderToggleComponent } from './header-toggle.component';

describe('HeaderToggleComponent', () => {
  let component: HeaderToggleComponent;
  let fixture: ComponentFixture<HeaderToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
