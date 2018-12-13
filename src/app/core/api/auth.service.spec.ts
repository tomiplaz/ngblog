import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService, ResetPassword } from './auth.service';
import { ApiModule } from './api.module';
import { Credentials } from './auth.service';
import { User } from '../../users/user.interface';
import { authReducer } from '../store/auth/auth.reducer';
import { AppState } from '../store/store';
import { Login, Logout } from '../store/auth/auth.actions';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store<AppState>;
  const user: User = { id: 1, name: 'foo', email: 'foo@bar.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          auth: authReducer,
        }),
      ],
      providers: [AuthService]
    });

    service = TestBed.get(AuthService);
    store = TestBed.get(Store);
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

    describe('#confirmAccount', () => {
      const token = 'foo';

      it('should return an Observable', () => {
        const value = service.confirmAccount(token);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to confirm account when subscribed', () => {
        service.confirmAccount(token).subscribe();

        const mockRequest = httpTC.expectOne(service.CONFIRM_ACCOUNT_URL);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual({ token });
      });
    });

    describe('#login', () => {
      const credentials: Credentials = { email: user.email, password: 'password' };
      const mockSuccessResponse: { token: string, user: User } = { token: 'jwt', user };

      it('should return an Observable', () => {
        const value = service.login(credentials);

        expect(value instanceof Observable).toBeTruthy();
        httpTC.expectOne(service.LOGIN_URL);
      });

      it('should send a POST request with credentials', () => {
        service.login(credentials);

        const mockRequest = httpTC.expectOne(service.LOGIN_URL);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual(credentials);
      });

      it('should get response with token and user on success', () => {
        service.login(credentials).subscribe(response => {
          expect(response).toEqual(mockSuccessResponse);
        });

        httpTC.expectOne(service.LOGIN_URL).flush(mockSuccessResponse);
      });

      it('should dispatch Login action with token and user on success', () => {
        const dispatchSpy = spyOn(store, 'dispatch');

        service.login(credentials);
        httpTC.expectOne(service.LOGIN_URL).flush(mockSuccessResponse);

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(new Login(mockSuccessResponse.token, mockSuccessResponse.user));
      });

      it('should not dispatch any action on failure', () => {
        const dispatchSpy = spyOn(store, 'dispatch');

        service.login(credentials);
        httpTC.expectOne(service.LOGIN_URL).flush(null, { status: 400, statusText: 'Bad Request' });

        expect(dispatchSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('#logout', () => {
      it('should dispatch Logout action', () => {
        const dispatchSpy = spyOn(store, 'dispatch');

        service.logout();

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(new Logout());
      });
    });

    describe('#forgotPassword', () => {
      const email = 'foo@bar.com';

      it('should return an Observable', () => {
        const value = service.forgotPassword(email);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request for forgotten password when subscribed', () => {
        service.forgotPassword(email).subscribe();

        const mockRequest = httpTC.expectOne(service.FORGOT_PASSWORD_URL);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual({ email });
      });
    });

    describe('#resetPassword', () => {
      const data: ResetPassword = {
        token: 'foo',
        newPassword: 'bar',
      };

      it('should return an Observable', () => {
        const value = service.resetPassword(data);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to reset password when subscribed', () => {
        service.resetPassword(data).subscribe();

        const mockRequest = httpTC.expectOne(service.RESET_PASSWORD_URL);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual(data);
      });
    });
  });
});
