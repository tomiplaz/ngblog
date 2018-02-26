import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    UserPostsComponent
  ]
})
export class UsersModule { }
