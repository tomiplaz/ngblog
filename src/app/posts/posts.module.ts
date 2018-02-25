import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';

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
