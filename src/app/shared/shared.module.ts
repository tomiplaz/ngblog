import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorMessagesComponent,
  ],
  declarations: [
    ErrorMessagesComponent,
    ChangePasswordFormComponent,
  ]
})
export class SharedModule { }
