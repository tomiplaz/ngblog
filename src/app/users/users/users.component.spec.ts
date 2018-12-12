import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { UsersComponent } from './users.component';
import { User } from '../user.interface';
import { MessageService } from '../../core/message.service';
import { messageServiceStub } from '../../../tests/message-service.stub';
import { CommonService } from '../../core/common.service';
import { PaginatedResponse } from '../../shared/paginator/paginated-response.interface';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  describe('with successful route data subscription', () => {
    const results: PaginatedResponse<User> = {
      data: [{ name: 'Foo', email: 'foo@bar.com' }],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      from: 1,
      to: 1,
      total: 1,
      path: 'foo',
      next_page_url: 'nextfoo',
      prev_page_url: 'prevfoo',
    };

    beforeEach(async(() => {
      const routeStub = { data: of({ users: results }) };

      TestBed.configureTestingModule({
        declarations: [ UsersComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: Router, useValue: routerSpy },
          { provide: CommonService, useValue: {} },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have results property set', () => {
      expect(component.results).toEqual(results);
    });
  });

  describe('with unsuccessful route data subscription', () => {
    const errorMessage = 'foo';

    beforeEach(async(() => {
      const routeStub = { data: _throw(errorMessage) };

      TestBed.configureTestingModule({
        declarations: [ UsersComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: Router, useValue: routerSpy },
          { provide: CommonService, useValue: {} },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show error message', () => {
      const errorSpy = spyOn(TestBed.get(MessageService), 'error');

      try {
        fixture.detectChanges();
      } catch (e) {
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(errorMessage);
      }
    });

    it('should have results property set to undefined', () => {
      try {
        fixture.detectChanges();
      } catch (e) { }

      expect(component.results).toBeUndefined();
    });
  });
});
