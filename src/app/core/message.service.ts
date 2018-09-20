import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastrService: ToastrService) { }

  createAccountSuccess() {
    this.toastrService.success('Account created. Please log in.');
  }

  loginSuccess() {
    this.toastrService.info('Welcome back!');
  }

  createPostSuccess() {
    this.toastrService.success('Post created.');
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
          this.toastrService.error('Bad request.');
        }
        break;
      case 500:
        this.toastrService.error('Internal server error.');
        break;
      default:
        this.toastrService.error('Uknown error.');
    }
  }

}
