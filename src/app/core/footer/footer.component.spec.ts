import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { FooterComponent } from './footer.component';
import { sessionReducer } from '../store/session/session.reducer';
import { settingsReducer } from '../store/settings/settings.reducer';
import { AppState } from '../store/store';
import { ToggleFooter } from '../store/session/session.actions';
import { ToggleSize, ToggleTheme } from '../store/settings/settings.actions';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          session: sessionReducer,
          settings: settingsReducer,
        }),
      ],
      declarations: [ FooterComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should subscribe to store on init', () => {
    const storeSubscribeSpy = spyOn(store, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(storeSubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should have isFooterOpen prop initialized to store value', () => {
    fixture.detectChanges();

    expect(component.isFooterOpen).toBe(false);
  });

  it('should have classAttribute prop initialized based on store values', () => {
    fixture.detectChanges();

    expect(component.classAttribute).toBe('dark medium closed');
  });

  it('should have classAttribute prop initialized with no closed class if footer is open', () => {
    store.dispatch(new ToggleFooter());

    fixture.detectChanges();

    expect(component.classAttribute).toBe('dark medium');
  });

  it('#onToggleClick should dispatch ToggleFooter action', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.onToggleClick();

    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleFooter());
  });

  it('#onSizeClick should dispatch ToggleSize action', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.onSizeClick();

    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSize());
  });

  it('#onThemeClick should dispatch ToggleTheme action', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.onThemeClick();

    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleTheme());
  });
});
