import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PostsRoutingModule
  ],
  declarations: [
    PostsComponent,
    PostComponent
  ]
})
export class PostsModule { }
