import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { ApiModule } from './api.module';
import { Credentials } from './auth.service';
import { User } from '../../users/user.interface';
import { authReducer } from '../store/auth/auth.reducer';
import { AppState } from '../store/store';
import { Login, Logout } from '../store/auth/auth.actions';
import { environment } from '../../../environments/environment';

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

  describe('#login', () => {
    let httpTC: HttpTestingController;
    const loginUrl = `${environment.apiUrl}/login`;
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

      const mockRequest = httpTC.expectOne(loginUrl);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(credentials);
    });

    it('should get response with token and user on success', () => {
      service.login(credentials).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      httpTC.expectOne(loginUrl).flush(mockSuccessResponse);
    });

    it('should dispatch Login action with token and user on success', () => {
      const dispatchSpy = spyOn(store, 'dispatch');

      service.login(credentials);
      httpTC.expectOne(loginUrl).flush(mockSuccessResponse);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new Login(mockSuccessResponse.token, mockSuccessResponse.user));
    });

    it('should not dispatch any action on failure', () => {
      const dispatchSpy = spyOn(store, 'dispatch');

      service.login(credentials);
      httpTC.expectOne(loginUrl).flush(null, { status: 400, statusText: 'Bad Request' });

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('#logout should dispatch Logout action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    service.logout();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new Logout());
  });
});
