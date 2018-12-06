import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UsersService } from '../../core/api/users.service';
import { AppState } from '../../core/store/store';
import { selectUser } from '../../core/store/auth/auth.selectors';
import { User } from '../../users/user.interface';
import { MessageService } from '../../core/message.service';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  changePasswordForm: FormGroup;

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
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]],
    }, {
      validator: this.commonService.getPasswordMatchValidator('newPassword', 'confirmNewPassword'),
    });
  }

  onSubmit() {
    this.usersService.changePassword(this.userId, this.changePasswordForm.value).subscribe(() => {
      this.messageService.changePasswordSuccess();
      this.changePasswordForm.reset();
    }, response => {
      this.messageService.error(response);
    });
  }

}
