import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { ToggleTheme, ToggleSize } from '../store/settings/settings.actions';
import { Subscription } from 'rxjs';
import { ToggleFooter } from '../store/session/session.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  private storeSubscription: Subscription;
  isFooterOpen: boolean;
  @HostBinding('class') classAttribute: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.subscribe(state => {
      this.isFooterOpen = state.session.isFooterOpen;
      this.classAttribute = [
        state.settings.theme,
        state.settings.size,
        ...state.session.isFooterOpen ? [] : ['closed'],
      ].join(' ');
    });
  }

  onToggleClick() {
    this.store.dispatch(new ToggleFooter());
  }

  onSizeClick() {
    this.store.dispatch(new ToggleSize());
  }

  onThemeClick() {
    this.store.dispatch(new ToggleTheme());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
