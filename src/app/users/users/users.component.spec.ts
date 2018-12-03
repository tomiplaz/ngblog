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

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  describe('with successful route data subscription', () => {
    const users: User[] = [{ name: 'Foo', email: 'foo@bar.com' }];

    beforeEach(async(() => {
      const routeStub = { data: of({ users }) };

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

    it('should have users property set', () => {
      expect(component.users).toEqual(users);
    });

    it('#onUserNameClick should navigate to a single user', () => {
      const route = TestBed.get(ActivatedRoute);
      const router = TestBed.get(Router);
      const stringId = '123456';

      component.onUserNameClick(stringId);

      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([stringId], { relativeTo: route });
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

    it('should have user property set to undefined', () => {
      try {
        fixture.detectChanges();
      } catch (e) { }

      expect(component.users).toBeUndefined();
    });
  });
});
