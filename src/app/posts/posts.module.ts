import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostsResolverService } from './posts-resolver.service';
import { PostResolverService } from './post-resolver.service';
import { PostItemComponent } from './post-item/post-item.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  declarations: [
    PostsComponent,
    PostComponent,
    PostItemComponent,
    CommentFormComponent,
    CommentItemComponent,
  ],
  providers: [
    PostsResolverService,
    PostResolverService,
  ],
  exports: [
    PostItemComponent,
  ],
})
export class PostsModule { }
