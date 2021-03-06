import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from './message.service';
import { CoreModule } from './core.module';

describe('CommonService', () => {
  let service: MessageService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastrServiceSpyObj = jasmine.createSpyObj('ToastrService', ['info', 'success', 'error']);

    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        MessageService,
        { provide: ToastrService, useValue: toastrServiceSpyObj },
      ],
    });

    service = TestBed.get(MessageService);
    toastrServiceSpy = TestBed.get(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#createAccountSuccess should show toastr with create account success message', () => {
    service.createAccountSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.CREATE_ACCOUNT_SUCCESS);
  });

  it('#confirmAccountSuccess should show toastr with confirm account success message', () => {
    service.confirmAccountSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.CONFIRM_ACCOUNT_SUCCESS);
  });

  it('#loginSuccess should show toastr with login info message', () => {
    service.loginSuccess();

    expect(toastrServiceSpy.info).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.info).toHaveBeenCalledWith(service.MESSAGES.LOGIN_SUCCESS);
  });

  it('#logoutSuccess should show toastr with logout info message', () => {
    service.logoutSuccess();

    expect(toastrServiceSpy.info).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.info).toHaveBeenCalledWith(service.MESSAGES.LOGOUT_SUCCESS);
  });

  it('#createPostSuccess should show toastr with create post success message', () => {
    service.createPostSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.CREATE_POST_SUCCESS);
  });

  it('#createCommentSuccess should show toastr with create comment success message', () => {
    service.createCommentSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.CREATE_COMMENT_SUCCESS);
  });

  it('#updateMyProfileSuccess should show toastr with update my profile success message', () => {
    service.updateMyProfileSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.UPDATE_MY_PROFILE_SUCCESS);
  });

  it('#changePasswordSuccess should show toastr with change password success message', () => {
    service.changePasswordSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.CHANGE_PASSWORD_SUCCESS);
  });

  it('#forgotPasswordEmailSent should show toastr with forgot password email sent message', () => {
    service.forgotPasswordEmailSent();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.FORGOT_PASSWORD_EMAIL_SENT);
  });

  it('#forgotPasswordEmailRequired should show toastr with forgot password email required message', () => {
    service.forgotPasswordEmailRequired();

    expect(toastrServiceSpy.error).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(service.MESSAGES.FORGOT_PASSWORD_EMAIL_REQUIRED);
  });

  it('#resetPasswordSuccess should show toastr with reset password success message', () => {
    service.resetPasswordSuccess();

    expect(toastrServiceSpy.success).toHaveBeenCalledTimes(1);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(service.MESSAGES.RESET_PASSWORD_SUCCESS);
  });

  describe('#error', () => {
    it('should show toastr with response error message if response has error message and status is 400', () => {
      const stubResponse = { status: 400, error: { message: 'foo' } };

      service.error(stubResponse);

      expect(toastrServiceSpy.error).toHaveBeenCalledTimes(1);
      expect(toastrServiceSpy.error).toHaveBeenCalledWith(stubResponse.error.message);
    });

    it('should show toastrs with validation error messages if response has validation errors and status is 400', () => {
      const stubResponse = {
        status: 400,
        error: {
          response: {
            original: {
              foo: ['foo', 'foo'],
              bar: ['bar'],
            },
          },
        },
      };

      service.error(stubResponse);

      expect(toastrServiceSpy.error).toHaveBeenCalledTimes(3);
      expect(toastrServiceSpy.error.calls.argsFor(0)).toEqual(['foo']);
      expect(toastrServiceSpy.error.calls.argsFor(1)).toEqual(['foo']);
      expect(toastrServiceSpy.error.calls.argsFor(2)).toEqual(['bar']);
    });

    it('should show toastr with bad request message if response has no validation errors and status is 400', () => {
      const stubResponse = { status: 400 };

      service.error(stubResponse);

      expect(toastrServiceSpy.error).toHaveBeenCalledTimes(1);
      expect(toastrServiceSpy.error).toHaveBeenCalledWith(service.MESSAGES.BAD_REQUEST);
    });

    it('should show toastr with internal server error message if response status is 500', () => {
      const stubResponse = { status: 500 };

      service.error(stubResponse);

      expect(toastrServiceSpy.error).toHaveBeenCalledTimes(1);
      expect(toastrServiceSpy.error).toHaveBeenCalledWith(service.MESSAGES.INTERNAL_SERVER_ERROR);
    });

    it('should show toastr with uknown error message as a default case', () => {
      const stubResponse = { status: null };

      service.error(stubResponse);

      expect(toastrServiceSpy.error).toHaveBeenCalledTimes(1);
      expect(toastrServiceSpy.error).toHaveBeenCalledWith(service.MESSAGES.UNKNOWN_ERROR);
    });
  });
});
