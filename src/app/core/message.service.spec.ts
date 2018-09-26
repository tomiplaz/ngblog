import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';
import { CoreModule } from './core.module';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
