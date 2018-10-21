import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService, JWT_KEY, USER_KEY } from './login.service';
import { ApiModule } from './api.module';
import { Login } from '../../login/login.interface';
import { User } from '../../users/user.interface';
import { environment } from '../../../environments/environment';
import { FakeLocalStorage } from '../../../tests/fake.local-storage';

fdescribe('LoginService', () => {
  let service: LoginService;

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
    const url = `${environment.apiUrl}/login`;
    const credentials: Login = {
      email: 'foo@bar.com',
      password: 'password',
    };
    const mockSuccessResponse: { token: string, user: User } = {
      token: 'jwt',
      user: { name: 'foo', email: credentials.email },
    };

    beforeEach(() => {
      httpTC = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpTC.verify();
    });

    it('should send a POST request with credentials', () => {
      service.login(credentials);

      const mockRequest = httpTC.expectOne(url);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(credentials);
    });

    it('should get response with token and user on success', () => {
      service.login(credentials).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      httpTC.expectOne(url).flush(mockSuccessResponse);
    });

    it('should set token and user in local storage on success', () => {
      const mockLocalStorage = new FakeLocalStorage();

      service.login(credentials).subscribe(() => {
        expect(mockLocalStorage.spies.setItem).toHaveBeenCalledTimes(2);
        expect(mockLocalStorage.spies.setItem).toHaveBeenCalledWith(JWT_KEY, mockSuccessResponse.token);
        expect(mockLocalStorage.spies.setItem).toHaveBeenCalledWith(USER_KEY, JSON.stringify(mockSuccessResponse.user));
        expect(mockLocalStorage.length).toBe(2);
        expect(mockLocalStorage.getItem(JWT_KEY)).toBe(mockSuccessResponse.token);
        expect(mockLocalStorage.getItem(USER_KEY)).toEqual(JSON.stringify(mockSuccessResponse.user));
      });

      httpTC.expectOne(url).flush(mockSuccessResponse);
    });
  });

  it('should be able to provide token', () => {
    //
  });

  it('should be able to provide user', () => {
    //
  });

  it('should be able to provide user ID', () => {
    //
  });
});
