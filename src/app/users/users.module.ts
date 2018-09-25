import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UsersResolverService } from './users-resolver.service';
import { UserResolverService } from './user-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    UserPostsComponent
  ],
  providers: [
    UsersResolverService,
    UserResolverService,
  ],
})
export class UsersModule { }
