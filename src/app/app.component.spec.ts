import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { sessionReducer } from './core/store/session/session.reducer';
import { settingsReducer } from './core/store/settings/settings.reducer';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
