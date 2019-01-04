import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AppState } from '../store/store';
import { authReducer } from '../store/auth/auth.reducer';
import { sessionReducer } from '../store/session/session.reducer';
import { settingsReducer } from '../store/settings/settings.reducer';
import { ToggleHeader } from '../store/session/session.actions';
import { AuthService } from '../api/auth.service';
import { MessageService } from '../message.service';
import { messageServiceStub } from 'tests/message-service.stub';

class RouterStub {
  navigate() { }

  events = {
    pipe: () => this.events,
    subscribe: () => new Subscription(),
  }
}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<AppState>;

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
        { provide: Router, useValue: new RouterStub() },
        { provide: AuthService, useValue: {} },
        { provide: MessageService, useValue: messageServiceStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should pipe and subscribe to router events on init', () => {
    const router = TestBed.get(Router);
    const routerEventsPipeSpy = spyOn(router.events, 'pipe').and.callThrough();
    const routerEventsSubscribeSpy = spyOn(router.events, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(routerEventsPipeSpy).toHaveBeenCalledTimes(1);
    expect(routerEventsSubscribeSpy).toHaveBeenCalledTimes(1);
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
});
