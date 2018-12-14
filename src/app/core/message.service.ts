import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  readonly MESSAGES = {
    CREATE_ACCOUNT_SUCCESS: 'Account created. Please check your email to confirm it.',
    CONFIRM_ACCOUNT_SUCCESS: 'Account confirmed. Please log in.',
    LOGIN_SUCCESS: 'Logged in!',
    LOGOUT_SUCCESS: 'Logged out!',
    CREATE_POST_SUCCESS: 'Post created.',
    CREATE_COMMENT_SUCCESS: 'Comment created.',
    UPDATE_MY_PROFILE_SUCCESS: 'Profile updated.',
    CHANGE_PASSWORD_SUCCESS: 'Password changed.',
    FORGOT_PASSWORD_EMAIL_SENT: 'Please check your email to reset your password.',
    FORGOT_PASSWORD_EMAIL_REQUIRED: 'Email is required for forgotten password.',
    RESET_PASSWORD_SUCCESS: 'Password reset.',
    BAD_REQUEST: 'Bad request.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    UNKNOWN_ERROR: 'Uknown error.',
  };

  constructor(private toastrService: ToastrService) { }

  createAccountSuccess() {
    this.toastrService.success(this.MESSAGES.CREATE_ACCOUNT_SUCCESS);
  }

  confirmAccountSuccess() {
    this.toastrService.success(this.MESSAGES.CONFIRM_ACCOUNT_SUCCESS);
  }

  loginSuccess() {
    this.toastrService.info(this.MESSAGES.LOGIN_SUCCESS);
  }

  logoutSuccess() {
    this.toastrService.info(this.MESSAGES.LOGOUT_SUCCESS);
  }

  createPostSuccess() {
    this.toastrService.success(this.MESSAGES.CREATE_POST_SUCCESS);
  }

  createCommentSuccess() {
    this.toastrService.success(this.MESSAGES.CREATE_COMMENT_SUCCESS);
  }

  updateMyProfileSuccess() {
    this.toastrService.success(this.MESSAGES.UPDATE_MY_PROFILE_SUCCESS);
  }

  changePasswordSuccess() {
    this.toastrService.success(this.MESSAGES.CHANGE_PASSWORD_SUCCESS);
  }

  forgotPasswordEmailSent() {
    this.toastrService.success(this.MESSAGES.FORGOT_PASSWORD_EMAIL_SENT);
  }

  forgotPasswordEmailRequired() {
    this.toastrService.error(this.MESSAGES.FORGOT_PASSWORD_EMAIL_REQUIRED);
  }

  resetPasswordSuccess() {
    this.toastrService.success(this.MESSAGES.RESET_PASSWORD_SUCCESS);
  }

  error(response: any) {
    switch (response.status) {
      case 400:
        if (response.error && response.error.message) {
          this.toastrService.error(response.error.message);
        } else {
          try {
            const errors = response.error.response.original;
            // Print each error message (if any)
            Object.keys(errors).forEach((type: string) => {
              errors[type].forEach(message => {
                this.toastrService.error(message);
              });
            });
          } catch (e) {
            this.toastrService.error(this.MESSAGES.BAD_REQUEST);
          }
        }
        break;
      case 500:
        this.toastrService.error(response.error.error || this.MESSAGES.INTERNAL_SERVER_ERROR);
        break;
      default:
        this.toastrService.error(this.MESSAGES.UNKNOWN_ERROR);
    }
  }

}
