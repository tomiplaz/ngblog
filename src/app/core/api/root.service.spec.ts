import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { RootService } from './root.service';
import { ApiModule } from './api.module';

describe('RootService', () => {
  let service: RootService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
      providers: [RootService]
    });

    service = TestBed.get(RootService);
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

    describe('#getHomeData', () => {
      it('should return an Observable', () => {
        const value = service.getHomeData();

        expect(value instanceof Observable).toBeTruthy();
      });

      it('should send a request to get home data when subscribed', () => {
        service.getHomeData().subscribe();

        const mockRequest = httpTC.expectOne(`${service.BASE_URL}/home`);
        expect(mockRequest.request.method).toBe('GET');
      });
    });
  });
});
