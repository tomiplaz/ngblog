import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { PaginatorComponent } from './paginator.component';
import { MessageService } from 'app/core/message.service';
import { messageServiceStub } from 'tests/message-service.stub';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ],
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: MessageService, useValue: messageServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  describe('with no results input provided', () => {
    it('should throw error', () => {
      try {
        fixture.detectChanges();
      } catch (e) {
        expect(e.message).toBe(component.RESULTS_REQUIRED);
      }
    });
  });

  describe('with results input provided', () => {
    beforeEach(() => {
      component.results = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 1,
        from: 0,
        to: 0,
        total: 0,
        path: 'foo',
        next_page_url: 'bar',
        prev_page_url: 'baz',
      };
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
