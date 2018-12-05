import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UsersResolverService } from './users-resolver.service';
import { UserResolverService } from './user-resolver.service';
import { UserItemComponent } from './user-item/user-item.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileFormComponent } from './my-profile/my-profile-form/my-profile-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    UserPostsComponent,
    UserItemComponent,
    MyProfileComponent,
    MyProfileFormComponent
  ],
  providers: [
    UsersResolverService,
    UserResolverService,
  ],
})
export class UsersModule { }
