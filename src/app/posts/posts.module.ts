import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ],
  declarations: [
    PostsComponent,
    PostComponent,
    PostFormComponent,
    CreatePostComponent
  ]
})
export class PostsModule { }
