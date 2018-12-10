import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorMessagesComponent,
    PaginatorComponent,
  ],
  declarations: [
    ErrorMessagesComponent,
    PaginatorComponent,
  ]
})
export class SharedModule { }
