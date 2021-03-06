import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsService } from '../core/api/posts.service';
import { Post } from './post.interface';

@Injectable()
export class PostResolverService implements Resolve<Post> {

  constructor(private postsService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    return this.postsService.getPost(route.params.key);
  }

}
