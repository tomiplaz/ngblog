import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ErrorMessagesComponent,
    ChangePasswordFormComponent,
  ],
  declarations: [
    ErrorMessagesComponent,
    ChangePasswordFormComponent,
  ]
})
export class SharedModule { }
