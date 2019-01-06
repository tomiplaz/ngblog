import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { sessionReducer } from './core/store/session/session.reducer';
import { settingsReducer } from './core/store/settings/settings.reducer';
import { AppState } from './core/store/store';
import { ToggleHeader, FreezeOpenHeader, ThawCloseHeader } from './core/store/session/session.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          session: sessionReducer,
          settings: settingsReducer,
        }),
      ],
      declarations: [ AppComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', async(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should subscribe to store on init', () => {
    const subscribeSpy = spyOn(store, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('should have classAttribute prop initialized based on store values', () => {
    fixture.detectChanges();

    expect(component.classAttribute).toBe('dark medium');
  });

  it('should have classAttribute prop initialized with closed class if header is closed', () => {
    store.dispatch(new ToggleHeader());

    fixture.detectChanges();

    expect(component.classAttribute).toBe('dark medium header-closed');
  });

  it('should pipe subscribe to scroll on init', () => {
    const pipeSpy = spyOn(component.scroll$, 'pipe').and.callThrough();
    const subscribeSpy = spyOn(component.scroll$, 'subscribe').and.callThrough();

    fixture.detectChanges();

    expect(pipeSpy).toHaveBeenCalledTimes(1);
    expect(subscribeSpy).toHaveBeenCalledTimes(1);
  });

  xit('should dispatch freeze open header action if view is at the top', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    spyOn(component.mainElementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 0 });

    window.dispatchEvent(new Event('scroll'));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new FreezeOpenHeader());
  });

  xit('should dispatch thaw close header action if view is not at the top', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    spyOn(component.mainElementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ top: 1000 });

    window.dispatchEvent(new Event('scroll'));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new ThawCloseHeader());
  });
});
