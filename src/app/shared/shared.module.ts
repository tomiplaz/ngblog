import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ToggleComponent } from './toggle/toggle.component';
import { HrefPipe } from './href.pipe';
import { HeadPipe } from './head.pipe';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    ErrorMessagesComponent,
    PaginatorComponent,
    ToggleComponent,
    HrefPipe,
  ],
  declarations: [
    ErrorMessagesComponent,
    PaginatorComponent,
    ToggleComponent,
    HrefPipe,
    HeadPipe,
  ]
})
export class SharedModule { }
