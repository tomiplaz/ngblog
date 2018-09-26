import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { ApiModule } from './api.module';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
      providers: [LoginService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
