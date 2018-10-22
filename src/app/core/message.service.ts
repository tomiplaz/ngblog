import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  readonly MESSAGES = {
    CREATE_ACCOUNT_SUCCESS: 'Account created. Please log in.',
    LOGIN_SUCCESS: 'Welcome back!',
    CREATE_POST_SUCCESS: 'Post created.',
    CREATE_COMMENT_SUCCESS: 'Comment created.',
    BAD_REQUEST: 'Bad request.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    UNKNOWN_ERROR: 'Uknown error.',
  };

  constructor(private toastrService: ToastrService) { }

  createAccountSuccess() {
    this.toastrService.success(this.MESSAGES.CREATE_ACCOUNT_SUCCESS);
  }

  loginSuccess() {
    this.toastrService.info(this.MESSAGES.LOGIN_SUCCESS);
  }

  createPostSuccess() {
    this.toastrService.success(this.MESSAGES.CREATE_POST_SUCCESS);
  }

  createCommentSuccess() {
    this.toastrService.success(this.MESSAGES.CREATE_COMMENT_SUCCESS);
  }

  error(response: any) {
    switch (response.status) {
      case 400:
        if (response.error.message) {
          this.toastrService.error(response.error.message);
        } else try {
          // Display validation error messages, if any
          let errors = response.error.response.original;
          for (let type in errors) {
            errors[type].forEach(message => {
              this.toastrService.error(message);
            });
          }
        } catch (e) {
          this.toastrService.error(this.MESSAGES.BAD_REQUEST);
        }
        break;
      case 500:
        this.toastrService.error(this.MESSAGES.INTERNAL_SERVER_ERROR);
        break;
      default:
        this.toastrService.error(this.MESSAGES.UNKNOWN_ERROR);
    }
  }

}
