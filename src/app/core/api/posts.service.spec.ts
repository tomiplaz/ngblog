import { TestBed, inject } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { ApiModule } from './api.module';

describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [PostsService]
    });
  });

  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
});
