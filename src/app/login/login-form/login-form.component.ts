import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../core/api/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value)
      .subscribe(response => {
        this.toastrService.info('Welcome back!');
        this.router.navigate(['/home']);
      }, response => {
        this.toastrService.error('Invalid credentials.');
        this.loginForm.reset();
      });
  }
  
}
