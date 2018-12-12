import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAccountRoutingModule } from './confirm-account-routing.module';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ConfirmAccountResolverService } from './confirm-account-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    ConfirmAccountRoutingModule
  ],
  declarations: [ConfirmAccountComponent],
  providers: [ConfirmAccountResolverService]
})
export class ConfirmAccountModule { }
