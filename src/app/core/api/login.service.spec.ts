import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService, JWT_KEY, USER_KEY } from './login.service';
import { ApiModule } from './api.module';
import { Login } from '../../login/login.interface';
import { User } from '../../users/user.interface';
import { LocalStorageFake } from '../../../tests/local-storage.fake';

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

  it('should provide initial value for logged in user', () => {
    service.loggedInUser$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  describe('#login', () => {
    let httpTC: HttpTestingController;
    const credentials: Login = { email: user.email, password: 'password' };
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

    it('should set token and user in local storage on success', () => {
      const localStorageMock = new LocalStorageFake();

      service.login(credentials).subscribe(() => {
        expect(localStorageMock.spies.setItem).toHaveBeenCalledTimes(2);
        expect(localStorageMock.spies.setItem).toHaveBeenCalledWith(JWT_KEY, mockSuccessResponse.token);
        expect(localStorageMock.spies.setItem).toHaveBeenCalledWith(USER_KEY, JSON.stringify(mockSuccessResponse.user));
        expect(localStorageMock.length).toBe(2);
        expect(localStorageMock.getItem(JWT_KEY)).toBe(mockSuccessResponse.token);
        expect(localStorageMock.getItem(USER_KEY)).toEqual(JSON.stringify(mockSuccessResponse.user));
      });

      httpTC.expectOne(service.URL).flush(mockSuccessResponse);
    });

    it('should provide next value for logged in user on success', () => {
      service.login(credentials);
      service.loggedInUser$.subscribe(loggedInUser => {
        expect(loggedInUser).toEqual(mockSuccessResponse.user);
      });

      httpTC.expectOne(service.URL).flush(mockSuccessResponse);
    });
  });

  describe('#logout', () => {
    it('should remove token and user in local storage', () => {
      const localStorageMock = new LocalStorageFake();

      service.logout();

      expect(localStorageMock.spies.removeItem).toHaveBeenCalledTimes(2);
      expect(localStorageMock.spies.removeItem).toHaveBeenCalledWith(JWT_KEY);
      expect(localStorageMock.spies.removeItem).toHaveBeenCalledWith(USER_KEY);
    });

    it('should provide null for next value for logged in user', () => {
      service.logout();

      service.loggedInUser$.subscribe(loggedInUser => {
        expect(loggedInUser).toBeNull();
      });
    });
  });

  it('#getToken should return token from local storage', () => {
    const localStorageMock = new LocalStorageFake();

    const token = service.getToken();

    expect(localStorageMock.spies.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.spies.getItem).toHaveBeenCalledWith(JWT_KEY);
    expect(token).toBeNull();
  });

  it('#getUser should return logged in user from local storage', () => {
    const localStorageMock = new LocalStorageFake();

    const user = service.getUser();

    expect(localStorageMock.spies.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.spies.getItem).toHaveBeenCalledWith(USER_KEY);
    expect(user).toBeNull();
  });

  describe('#getUserId', () => {
    it('should return user\'s ID if user is logged in', () => {
      const getUserSpy = spyOn(service, 'getUser').and.returnValue(user);

      const userId = service.getUserId();

      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(userId).toBe(user.id);
    });

    it('should return null if user is not logged in', () => {
      const getUserSpy = spyOn(service, 'getUser');

      const userId = service.getUserId();

      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(userId).toBeNull();
    });
  });
});
