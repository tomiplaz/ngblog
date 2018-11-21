import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorMessagesComponent,
  ],
  declarations: [
    ErrorMessagesComponent,
  ]
})
export class SharedModule { }
