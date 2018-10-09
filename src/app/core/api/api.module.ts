import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    LoginService,
    PostsService,
    UsersService
  ]
})
export class ApiModule { }
