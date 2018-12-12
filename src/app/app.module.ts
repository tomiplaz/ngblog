import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { CreateAccountModule } from './create-account/create-account.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyProfileModule } from './my-profile/my-profile.module';
import { CreatePostModule } from './create-post/create-post.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ConfirmAccountModule } from './confirm-account/confirm-account.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HomeModule,
    LoginModule,
    CreateAccountModule,
    ConfirmAccountModule,
    MyProfileModule,
    CreatePostModule,
    ResetPasswordModule,
    PostsModule,
    UsersModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
