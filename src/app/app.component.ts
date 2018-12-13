import { Component, OnInit, HostBinding, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppState } from './core/store/store';
import { FreezeOpenHeader, ThawCloseHeader } from './core/store/session/session.actions';

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

  private scroll$ = fromEvent(window, 'scroll');

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
    });

    this.scrollSubscription = this.scroll$.pipe(debounceTime(100)).subscribe(() => {
      const top = this.contentElementRef.nativeElement.getBoundingClientRect().top;

      if (top > this.TOP - this.TOP_EXTRA) {
        this.store.dispatch(new FreezeOpenHeader());
      } else {
        this.store.dispatch(new ThawCloseHeader());
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

}
