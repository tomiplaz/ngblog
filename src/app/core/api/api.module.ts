import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';
import { RootService } from './root.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    PostsService,
    UsersService,
    RootService,
  ]
})
export class ApiModule { }
