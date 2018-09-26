import { TestBed, inject } from '@angular/core/testing';

import { UsersService } from './users.service';
import { ApiModule } from './api.module';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [UsersService]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
