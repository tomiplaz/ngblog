import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/api/auth.service';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(() => {
      this.messageService.loginSuccess();
      this.router.navigate(['/home']);
    }, response => {
      this.messageService.error(response);
    });
  }

  onForgotPasswordClick() {
    const email = this.loginForm.controls.email.value;

    if (email) {
      this.authService.forgotPassword(email).subscribe(() => {
        this.messageService.forgotPasswordEmailSent();
      }, response => {
        this.messageService.error(response);
      });
    } else {
      this.messageService.forgotPasswordEmailRequired();
    }
  }

}
