import { TestBed } from '@angular/core/testing';
import { CommonService } from './common.service';
import { CoreModule } from './core.module';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [CommonService],
    });

    service = TestBed.get(CommonService);
  });

  it('#trackById should return object\'s id property', () => {
    const object = { id: 1 };

    const value = service.trackById(0, object);

    expect(value).toBe(object.id);
  });
});
