import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { FooterComponent } from './footer.component';
import { sessionReducer } from '../store/session/session.reducer';
import { settingsReducer } from '../store/settings/settings.reducer';
import { AppState } from '../store/store';

fdescribe('FooterComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should subscribe to store on init', () => {
    const storeSubscribeSpy = spyOn(store, 'subscribe');

    expect(storeSubscribeSpy).toHaveBeenCalledTimes(1);
  });
});
