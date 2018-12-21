import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../posts/post.interface';
import { Comment } from '../../posts/comment.interface';
import { PaginatedResponse } from '../../shared/paginator/paginated-response.interface';

@Injectable()
export class PostsService {

  readonly BASE_URL = `${environment.apiUrl}/posts`;

  constructor(private httpClient: HttpClient) { }

  getPosts(params?: Params): Observable<PaginatedResponse<Post>> {
    const options = {
      params: params || {},
    };
    return this.httpClient.get<PaginatedResponse<Post>>(this.BASE_URL, options);
  }

  getPost(key: string): Observable<Post> {
    const url = `${this.BASE_URL}/${key}`;
    return this.httpClient.get<Post>(url);
  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.BASE_URL, post);
  }

  createComment(postId: number, comment: Comment): Observable<Comment> {
    const url = `${this.BASE_URL}/${postId}/comments`;
    return this.httpClient.post<Comment>(url, comment);
  }

}
