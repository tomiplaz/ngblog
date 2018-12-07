import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../core/common.service';
import { AuthService, ResetPassword } from '../../../core/api/auth.service';
import { MessageService } from '../../../core/message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  resetPasswordForm: FormGroup;

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

    this.authService.resetPassword(data).subscribe(() => {
      this.messageService.resetPasswordSuccess();
      this.router.navigate(['login']);
    }, response => {
      this.messageService.error(response);
    }, () => {
      this.resetPasswordForm.reset();
    });
  }

}
