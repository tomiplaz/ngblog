import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoggedInGuard } from '../core/logged-in-guard.service';

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [ LoggedInGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
