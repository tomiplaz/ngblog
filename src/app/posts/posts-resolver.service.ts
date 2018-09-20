import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PostsService } from '../core/api/posts.service';
import { Post } from '../posts/post.interface';

@Injectable()
export class PostsResolverService implements Resolve<Post[]> {

  constructor(private postsService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.postsService.getPosts();
  }

}
