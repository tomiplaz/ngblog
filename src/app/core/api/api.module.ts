import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [],
  providers: [
    AuthService,
    PostsService,
    UsersService
  ]
})
export class ApiModule { }
