import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MyProfileFormComponent } from './my-profile-form.component';
import { authReducer } from 'app/core/store/auth/auth.reducer';
import { UsersService } from 'app/core/api/users.service';
import { MessageService } from 'app/core/message.service';
import { messageServiceStub } from 'tests/message-service.stub';

describe('MyProfileFormComponent', () => {
  let component: MyProfileFormComponent;
  let fixture: ComponentFixture<MyProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          auth: authReducer,
        }),
      ],
      declarations: [ MyProfileFormComponent ],
      providers: [
        { provide: UsersService, useValue: {} },
        { provide: MessageService, useValue: messageServiceStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
