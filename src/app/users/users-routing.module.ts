import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UsersResolverService } from './users-resolver.service';
import { UserResolverService } from './user-resolver.service';
import { LoggedInGuard } from '../core/logged-in-guard.service';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate: [ LoggedInGuard ]
      },
      {
        path: ':stringId',
        children: [
          {
            path: 'posts',
            component: UserPostsComponent,
          },
          {
            path: '',
            component: UserComponent,
            resolve: {
              user: UserResolverService,
            },
          },
        ],
      },
      {
        path: '',
        component: UsersComponent,
        resolve: {
          users: UsersResolverService
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
