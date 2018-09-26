import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountFormComponent } from './create-account-form.component';
import { CreateAccountModule } from '../create-account.module';
import { CoreModule } from '../../core/core.module';
import { AppRoutingModule } from '../../app-routing.module';

describe('CreateAccountFormComponent', () => {
  let component: CreateAccountFormComponent;
  let fixture: ComponentFixture<CreateAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CreateAccountModule, CoreModule, AppRoutingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
