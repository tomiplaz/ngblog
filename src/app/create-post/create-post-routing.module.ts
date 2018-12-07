import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoggedInGuard } from '../core/logged-in-guard.service';

const routes: Routes = [
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [ LoggedInGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePostRoutingModule { }
