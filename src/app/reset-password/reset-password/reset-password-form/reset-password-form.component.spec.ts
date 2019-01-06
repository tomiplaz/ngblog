import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResetPasswordFormComponent } from './reset-password-form.component';
import { CommonService } from 'app/core/common.service';
import { AuthService } from 'app/core/api/auth.service';
import { authServiceStub } from 'tests/auth-service.stub';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'app/core/message.service';
import { messageServiceStub } from 'tests/message-service.stub';

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordFormComponent;
  let fixture: ComponentFixture<ResetPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ResetPasswordFormComponent ],
      providers: [
        CommonService,
        { provide: AuthService, useValue: authServiceStub },
        { provide: ActivatedRoute, useValue: {} },
        { provide: MessageService, useValue: messageServiceStub },
        { provide: Router, useValue: {} },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
