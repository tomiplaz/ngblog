import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../../../core/api/users.service';
import { AppState } from '../../../core/store/store';
import { selectUser } from '../../../core/store/auth/auth.selectors';
import { User, ChangePassword } from '../../../users/user.interface';
import { MessageService } from '../../../core/message.service';
import { CommonService } from '../../../core/common.service';
import { SetToken } from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  changePasswordForm: FormGroup;
  isWaitingForResponse = false;

  private userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private commonService: CommonService,
    private usersService: UsersService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectUser)).subscribe((user: User) => {
      this.userId = user.id;
    }).unsubscribe();

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [null, [Validators.required]],
    }, {
      validator: this.commonService.getPasswordMatchValidator('newPassword', 'confirmNewPassword'),
    });
  }

  onSubmit() {
    const data: ChangePassword = {
      currentPassword: this.changePasswordForm.controls.currentPassword.value,
      newPassword: this.changePasswordForm.controls.newPassword.value,
    };

    this.isWaitingForResponse = true;
    this.usersService.changePassword(this.userId, data)
      .pipe(finalize(() => this.isWaitingForResponse = false))
      .subscribe(response => {
        this.messageService.changePasswordSuccess();
        this.store.dispatch(new SetToken(response.token));
      }, response => {
        this.messageService.error(response);
      }, () => {
        this.changePasswordForm.reset();
      });
  }

}
