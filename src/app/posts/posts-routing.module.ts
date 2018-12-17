import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PostsResolverService } from './posts-resolver.service';
import { PostResolverService } from './post-resolver.service';

const routes: Routes = [
  {
    path: 'posts',
    children: [
      {
        path: ':key',
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
