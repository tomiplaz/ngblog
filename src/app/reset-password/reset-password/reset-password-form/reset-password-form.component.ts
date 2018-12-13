import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../../core/common.service';
import { AuthService, ResetPassword } from '../../../core/api/auth.service';
import { MessageService } from '../../../core/message.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isWaitingForResponse: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [null, Validators.required],
    }, {
      validator: this.commonService.getPasswordMatchValidator('newPassword', 'confirmNewPassword'),
    });
  }

  onSubmit() {
    const data: ResetPassword = {
      token: this.route.snapshot.queryParamMap.get('token'),
      newPassword: this.resetPasswordForm.controls.newPassword.value,
    };

    this.isWaitingForResponse = true;
    this.authService.resetPassword(data)
      .finally(() => this.isWaitingForResponse = false)
      .subscribe(() => {
        this.messageService.resetPasswordSuccess();
        this.router.navigate(['/login']);
      }, response => {
        this.messageService.error(response);
      }, () => {
        this.resetPasswordForm.reset();
      });
  }

}
