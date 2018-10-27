import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoggedInGuard } from '../core/logged-in-guard.service';
import { PostsResolverService } from './posts-resolver.service';
import { PostResolverService } from './post-resolver.service';

const routes: Routes = [
  {
    path: 'posts',
    children: [
      {
        path: 'new',
        component: CreatePostComponent,
        canActivate: [ LoggedInGuard ]
      },
      {
        path: ':stringId',
        component: PostComponent,
        resolve: {
          post: PostResolverService
        }
      },
      {
        path: '',
        component: PostsComponent,
        resolve: {
          posts: PostsResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
