import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAccountRoutingModule } from './confirm-account-routing.module';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmAccountRoutingModule
  ],
  declarations: [ConfirmAccountComponent]
})
export class ConfirmAccountModule { }
