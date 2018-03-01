import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { CreateAccountFormComponent } from './create-account/create-account-form/create-account-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    LoginFormComponent,
    CreateAccountFormComponent
  ]
})
export class AuthModule { }
