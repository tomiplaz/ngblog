import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: ':id',
        children: [
          { path: 'posts', component: UserPostsComponent },
          { path: '', component: UserComponent }
        ]
      },
      { path: '', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
