import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Post } from '../../posts/post.interface';

@Injectable()
export class PostsService {

  private static baseUrl = environment.apiUrl + '/posts';

  constructor(private httpClient: HttpClient) { }

  getPosts() {
    return this.httpClient.get<Post[]>(PostsService.baseUrl);
  }
  
  getPost(stringId: string) {
    return this.httpClient.get<Post>(PostsService.baseUrl + '/' + stringId);
  }

  createPost(post: Post) {
    return this.httpClient.post<Post>(PostsService.baseUrl, post);
  }

}
