import { Component, OnInit, HostBinding, HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  @HostBinding('class') classAttribute: string;

  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.subscribe(store => {
      this.classAttribute = [
        store.settings.theme,
        store.settings.size,
        ...store.session.isHeaderOpen ? [] : ['header-closed'],
        ...store.auth.isLoggedIn ? [] : ['header-list-horizontal'],
      ].join(' ');
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const top = this.content.nativeElement.getBoundingClientRect().top;
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
