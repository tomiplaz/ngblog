import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { ApiModule } from './api.module';
import { Login } from '../../login/login.interface';
import { User } from '../../users/user.interface';
import { environment } from '../../../environments/environment';

fdescribe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
      providers: [LoginService]
    });
  });

  it('should be created', inject([LoginService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to perform login', inject(
    [LoginService, HttpTestingController],
    (service: LoginService, httpTC: HttpTestingController) => {
      const mockCredentials: Login = {
        email: 'foo@bar.com',
        password: 'password',
      };
      const mockSuccessResponse: { token: string, user: User } = {
        token: 'jwt',
        user: { name: 'foo', email: mockCredentials.email },
      };

      service.login(mockCredentials).subscribe(response => {
        const responseKeys = Object.keys(response);
        expect(responseKeys).toContain('token');
        expect(responseKeys).toContain('user');
        expect(response.token).toBe(mockSuccessResponse.token);
        expect(response.user).toEqual(mockSuccessResponse.user);
      });

      const mockRequest = httpTC.expectOne(`${environment.apiUrl}/login`);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(mockCredentials);
      mockRequest.flush(mockSuccessResponse);
    })
  );

  it('should be able to provide token', () => {
    //
  });

  it('should be able to provide user', () => {
    //
  });

  it('should be able to provide user ID', () => {
    //
  });

  afterEach(inject([HttpTestingController], (httpTC) => {
    httpTC.verify();
  }));
});
