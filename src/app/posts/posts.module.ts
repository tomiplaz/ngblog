import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsResolverService } from './posts-resolver.service';
import { PostResolverService } from './post-resolver.service';
import { PostItemComponent } from './post-item/post-item.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentItemComponent } from './comment-item/comment-item.component';

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
    CreatePostComponent,
    PostItemComponent,
    CommentFormComponent,
    CommentItemComponent,
  ],
  providers: [
    PostsResolverService,
    PostResolverService,
  ],
})
export class PostsModule { }
