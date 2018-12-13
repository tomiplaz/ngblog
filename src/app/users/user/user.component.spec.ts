import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserComponent } from './user.component';
import { User } from '../user.interface';
import { MessageService } from '../../core/message.service';
import { messageServiceStub } from '../../../tests/message-service.stub';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const user: User = { name: 'Foo', email: 'foo@bar.com' };

  describe('with successful route data subscription', () => {
    beforeEach(async(() => {
      const routeStub = { data: of({ user }) };

      TestBed.configureTestingModule({
        declarations: [ UserComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have user property set', () => {
      expect(component.user).toEqual(user);
    });
  });

  describe('with unsuccessful route data subscription', () => {
    const errorMessage = 'foo';

    beforeEach(async(() => {
      const routeStub = { data: throwError(errorMessage) };

      TestBed.configureTestingModule({
        declarations: [ UserComponent ],
        providers: [
          { provide: ActivatedRoute, useValue: routeStub },
          { provide: MessageService, useValue: messageServiceStub },
        ],
        schemas: [ NO_ERRORS_SCHEMA ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserComponent);
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

      expect(component.user).toBeUndefined();
    });
  });
});
