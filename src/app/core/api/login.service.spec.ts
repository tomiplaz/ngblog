import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { ApiModule } from './api.module';
import { Credentials } from '../../login/credentials.interface';
import { User } from '../../users/user.interface';

describe('LoginService', () => {
  let service: LoginService;
  const user: User = { id: 1, name: 'foo', email: 'foo@bar.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    let httpTC: HttpTestingController;
    const credentials: Credentials = { email: user.email, password: 'password' };
    const mockSuccessResponse: { token: string, user: User } = { token: 'jwt', user };

    beforeEach(() => {
      httpTC = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpTC.verify();
    });

    it('should send a POST request with credentials', () => {
      service.login(credentials);

      const mockRequest = httpTC.expectOne(service.URL);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(credentials);
    });

    it('should get response with token and user on success', () => {
      service.login(credentials).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      httpTC.expectOne(service.URL).flush(mockSuccessResponse);
    });

    it('should dispatch Login action with token and user', () => {
      //
    });
  });

  it('#logout should dispatch Logout action', () => {
    //
  });
});
