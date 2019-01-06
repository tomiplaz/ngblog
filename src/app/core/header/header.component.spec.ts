import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AppState } from '../store/store';
import { authReducer } from '../store/auth/auth.reducer';
import { sessionReducer } from '../store/session/session.reducer';
import { settingsReducer } from '../store/settings/settings.reducer';
import { ToggleHeader } from '../store/session/session.actions';
import { AuthService } from '../api/auth.service';
import { MessageService } from '../message.service';
import { messageServiceStub } from 'tests/message-service.stub';
import { authServiceStub } from 'tests/auth-service.stub';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<AppState>;
  let router: Router;
  let authService: AuthService;
  let messageService: MessageService;

  const routerStub = {
    navigate: () => {},
    events: new Subject<Event>(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: authReducer,
          session: sessionReducer,
          settings: settingsReducer,
        }),
      ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: MessageService, useValue: messageServiceStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    messageService = TestBed.get(MessageService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should pipe and subscribe to router events on init', () => {
    const routerEventsPipeSpy = spyOn(router.events, 'pipe').and.callThrough();
    const routerEventsSubscribeSpy = spyOn(router.events, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(routerEventsPipeSpy).toHaveBeenCalledTimes(1);
    expect(routerEventsSubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should have isAuthUrl prop initialized to false if route is not auth', () => {
    fixture.detectChanges();

    routerStub.events.next(new NavigationEnd(1, 'foo', 'bar'));

    expect(component.isAuthUrl).toBe(false);
  });

  it('should have isAuthUrl prop initialized to true if route is auth', () => {
    fixture.detectChanges();

    routerStub.events.next(new NavigationEnd(1, 'login', 'bar'));

    expect(component.isAuthUrl).toBe(true);
  });

  it('should subscribe to store on init', () => {
    const storeSubscribeSpy = spyOn(store, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(storeSubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should have isLoggedIn prop initialized to store value', () => {
    fixture.detectChanges();

    expect(component.isLoggedIn).toBe(false);
  });

  it('should have isHeaderOpen prop initialized to store value', () => {
    fixture.detectChanges();

    expect(component.isHeaderOpen).toBe(true);
  });

  it('should have isToggleDisabled prop initialized to store value', () => {
    fixture.detectChanges();

    expect(component.isToggleDisabled).toBe(true);
  });

  it('should have classAttribute prop initialized based on store values', () => {
    fixture.detectChanges();

    expect(component.classAttribute).toBe('dark medium');
  });

  it('should have classAttribute prop initialized with closed class if header is closed', () => {
    store.dispatch(new ToggleHeader());

    fixture.detectChanges();

    expect(component.classAttribute).toBe('dark medium closed');
  });

  describe('#onLogoutClick', () => {
    function insideEach() {
      fixture.detectChanges();
      component.onLogoutClick();
    }

    it('should perform logout', () => {
      const logoutSpy = spyOn(authService, 'logout');

      insideEach();

      expect(logoutSpy).toHaveBeenCalledTimes(1);
    });
  
    it('should display logout message', () => {
      const messageSpy = spyOn(messageService, 'logoutSuccess');

      insideEach();

      expect(messageSpy).toHaveBeenCalledTimes(1);
    });
  
    it('should navigate to home route', () => {
      const navigateSpy = spyOn(router, 'navigate');

      insideEach();

      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('#onToggleClick', () => {
    let dispatchSpy: jasmine.Spy;

    function insideEach(isToggleDisabled: boolean) {
      fixture.detectChanges();
      component.isToggleDisabled = isToggleDisabled;
      component.onToggleClick();
    }

    beforeEach(() => {
      dispatchSpy = spyOn(store, 'dispatch');
    });

    it('should not dispatch action if toggle is disabled', () => {
      insideEach(true);

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should dispatch ToggleHeader action if toggle is not disabled', () => {
      insideEach(false);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new ToggleHeader());
    });
  });
});
