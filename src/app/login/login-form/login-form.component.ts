import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/api/login.service';
import { MessageService } from '../../core/message.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './login-form.component.css',
  ]
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe(() => {
      this.messageService.loginSuccess();
      this.router.navigate(['home']);
    }, response => {
      this.messageService.error(response);
    });
  }

  onForgotPasswordClick() {
    const name = this.loginForm.controls.name.value;

    if (name) {
      this.authService.forgotPassword(name).subscribe(() => {
        this.messageService.forgotPasswordEmailSent();
      }, response => {
        this.messageService.error(response);
      });
    } else {
      this.messageService.forgotPasswordNameRequired();
    }
  }

}
