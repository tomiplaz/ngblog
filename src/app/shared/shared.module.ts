import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ToggleComponent } from './toggle/toggle.component';
import { HrefPipe } from './href.pipe';
import { HeadPipe } from './head.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    ErrorMessagesComponent,
    PaginatorComponent,
    ToggleComponent,
    HrefPipe,
    HeadPipe,
    SearchComponent,
  ],
  declarations: [
    ErrorMessagesComponent,
    PaginatorComponent,
    ToggleComponent,
    HrefPipe,
    HeadPipe,
    SearchComponent,
  ]
})
export class SharedModule { }
