import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CreateAccountRoutingModule,
  ],
  declarations: [
    CreateAccountComponent,
    CreateAccountFormComponent
  ]
})
export class CreateAccountModule { }
