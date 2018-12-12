import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ConfirmAccountResolverService } from './confirm-account-resolver.service';

const routes: Routes = [
  {
    path: 'confirm-account',
    component: ConfirmAccountComponent,
    resolve: {
      response: ConfirmAccountResolverService
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmAccountRoutingModule { }
