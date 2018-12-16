import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    ErrorMessagesComponent,
    PaginatorComponent,
    ToggleComponent,
  ],
  declarations: [
    ErrorMessagesComponent,
    PaginatorComponent,
    ToggleComponent,
  ]
})
export class SharedModule { }
