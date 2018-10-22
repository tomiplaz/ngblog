import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { PostsService } from './posts.service';
import { ApiModule } from './api.module';
import { Post } from '../../posts/post.interface';
import { Comment } from '../../posts/comment.interface';

fdescribe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
      providers: [PostsService]
    });

    service = TestBed.get(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method', () => {
    let httpTC: HttpTestingController;

    beforeEach(() => {
      httpTC = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpTC.verify();
    });

    describe('#getPosts', () => {

      it('should return an Observable', () => {
        const value = service.getPosts(null, null);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request with no params to get posts when subscribed', () => {
        service.getPosts(null, null).subscribe();

        const mockRequest = httpTC.expectOne(service.BASE_URL);
        expect(mockRequest.request.method).toBe('GET');
      });

      it('should send a request with params to get posts when subscribed', () => {
        const params = { tag: 'foo', user: 'bar' };
        service.getPosts(params.tag, params.user).subscribe();

        const mockRequest = httpTC.expectOne(`${service.BASE_URL}?tag=foo&user=bar`);
        expect(mockRequest.request.method).toBe('GET');
        expect(mockRequest.request.params.keys()).toEqual(Object.keys(params));
        expect(mockRequest.request.params.get('tag')).toBe(params.tag);
        expect(mockRequest.request.params.get('user')).toBe(params.user);
      });
    });

    describe('#getPost', () => {
      const stringId: string = 'foo';

      it('should return an Observable', () => {
        const value = service.getPost(stringId);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to get a post when subscribed', () => {
        service.getPost(stringId).subscribe();

        const mockRequest = httpTC.expectOne(`${service.BASE_URL}/${stringId}`);
        expect(mockRequest.request.method).toBe('GET');
      });
    });

    describe('#createPost', () => {
      const post: Post = { user_id: 1, title: 'foo', content: 'bar' };

      it('should return an Observable', () => {
        const value = service.createPost(post);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to create a post when subscribed', () => {
        service.createPost(post).subscribe();

        const mockRequest = httpTC.expectOne(service.BASE_URL);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual(post);
      });
    });

    describe('#createComment', () => {
      const postId: number = 1;
      const comment: Comment = { user_id: 1, text: 'foo' };

      it('should return an Observable', () => {
        const value = service.createComment(postId, comment);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to create a comment when subscribed', () => {
        service.createComment(postId, comment).subscribe();

        const mockRequest = httpTC.expectOne(`${service.BASE_URL}/${postId}/comments`);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual(comment);
      });
    });
  });
});
