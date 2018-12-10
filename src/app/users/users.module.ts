import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UsersResolverService } from './users-resolver.service';
import { UserResolverService } from './user-resolver.service';
import { UserItemComponent } from './user-item/user-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    UserPostsComponent,
    UserItemComponent,
  ],
  providers: [
    UsersResolverService,
    UserResolverService,
  ],
})
export class UsersModule { }
