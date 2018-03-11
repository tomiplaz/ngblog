import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateAccountRoutingModule } from './create-account-routing.module';

import { CreateAccountComponent } from './create-account.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreateAccountRoutingModule
  ],
  declarations: [
    CreateAccountComponent,
    CreateAccountFormComponent
  ]
})
export class CreateAccountModule { }
