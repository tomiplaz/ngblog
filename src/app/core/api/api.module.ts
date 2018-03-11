import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JwtService } from './jwt.service';
import { LoginService } from './login.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    JwtService,
    LoginService,
    PostsService,
    UsersService
  ]
})
export class ApiModule { }
