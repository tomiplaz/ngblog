import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsService } from '../core/api/posts.service';
import { Post } from './post.interface';
import { PaginatedResponse } from '../shared/paginator/paginated-response.interface';

@Injectable()
export class PostsResolverService implements Resolve<PaginatedResponse<Post>> {

  constructor(private postsService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResponse<Post>> {
    return this.postsService.getPosts(
      route.queryParamMap.get('tag'),
      route.queryParamMap.get('user'),
    );
  }

}
