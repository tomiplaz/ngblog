import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Post } from '../../posts/post.interface';
import { Comment } from '../../posts/comment.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostsService {

  private static baseUrl = environment.apiUrl + '/posts';

  constructor(private httpClient: HttpClient) { }

  getPosts(tag: string, user: string): Observable<Post[]> {
    const options = {
      params: {
        ...tag && { tag },
        ...user && { user },
      },
    };
    return this.httpClient.get<Post[]>(PostsService.baseUrl, options);
  }

  getPost(stringId: string): Observable<Post> {
    const url = `${PostsService.baseUrl}/${stringId}`;
    return this.httpClient.get<Post>(url);
  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(PostsService.baseUrl, post);
  }

  createPostComment(postId: number, comment: Comment): Observable<Comment> {
    const url = `${PostsService.baseUrl}/${postId}/comments`;
    return this.httpClient.post<Comment>(url, comment);
  }

}
