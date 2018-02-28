import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    PostsService,
    UsersService
  ]
})
export class ApiModule { }
