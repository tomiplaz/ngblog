import { Component, OnInit, HostBinding, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { AppState } from './core/store/store';
import { ToggleHeader, EnableHeaderToggle, DisableHeaderToggle } from './core/store/session/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  readonly TOP = 90;
  readonly TOP_EXTRA = 50;

  @ViewChild('content') contentElementRef: ElementRef;

  @HostBinding('class') classAttribute: string;

  private isHeaderOpen: boolean;
  private isLoggedIn: boolean;

  private scroll$ = Observable.fromEvent(window, 'scroll');

  private storeSubscription: Subscription;
  private scrollSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.subscribe(state => {
      this.classAttribute = [
        state.settings.theme,
        state.settings.size,
        ...state.session.isHeaderOpen ? [] : ['header-closed'],
      ].join(' ');

      this.isHeaderOpen = state.session.isHeaderOpen;
      this.isLoggedIn = state.auth.isLoggedIn;
    });

    this.scrollSubscription = this.scroll$.subscribe(() => {
      const top = this.contentElementRef.nativeElement.getBoundingClientRect().top;

      if (top > this.TOP - this.TOP_EXTRA) {
        this.freezeOpenHeader();
      } else {
        this.store.dispatch(new EnableHeaderToggle());

        if (top < this.TOP - this.TOP_EXTRA) {
          if (this.isHeaderOpen) this.store.dispatch(new ToggleHeader());
        }
      }
    });
  }

  private freezeOpenHeader() {
    this.store.dispatch(new DisableHeaderToggle());

    if (!this.isHeaderOpen) this.store.dispatch(new ToggleHeader());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

}
