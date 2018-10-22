import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service';
import { ApiModule } from './api.module';
import { User } from '../../users/user.interface';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
      providers: [UsersService]
    });

    service = TestBed.get(UsersService);
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

    describe('#getUsers', () => {
      it('should return an Observable', () => {
        const value = service.getUsers();

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to get users when subscribed', () => {
        service.getUsers().subscribe();

        const mockRequest = httpTC.expectOne(service.BASE_URL);
        expect(mockRequest.request.method).toBe('GET');
      });
    });

    describe('#getUser', () => {
      const stringId = 'foo';

      it('should return an Observable', () => {
        const value = service.getUser(stringId);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to get a user when subscribed', () => {
        service.getUser(stringId).subscribe();

        const mockRequest = httpTC.expectOne(`${service.BASE_URL}/${stringId}`);
        expect(mockRequest.request.method).toBe('GET');
      });
    });

    describe('#createUser', () => {
      const user: User = { name: 'foo', email: 'foo@bar.com', password: 'password' };

      it('should return an Observable', () => {
        const value = service.createUser(user);

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to create a user when subscribed', () => {
        service.createUser(user).subscribe();

        const mockRequest = httpTC.expectOne(service.BASE_URL);
        expect(mockRequest.request.method).toBe('POST');
        expect(mockRequest.request.body).toEqual(user);
      });
    });
  });
});
