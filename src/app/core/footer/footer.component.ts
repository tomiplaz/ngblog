import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { Theme, Size } from '../store/settings/settings.values';
import { ToggleTheme, ToggleSize } from '../store/settings/settings.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './footer.component.css',
  ]
})
export class FooterComponent implements OnInit, OnDestroy {

  private storeSubscription: Subscription;

  theme: Theme;
  size: Size;

  @HostBinding('class') classAttribute: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.subscribe(state => {
      this.theme = state.settings.theme;
      this.size = state.settings.size;
      this.classAttribute = [
        state.settings.theme,
        state.settings.size,
        ...state.session.isFooterOpen ? [] : ['closed'],
      ].join(' ');
    });
  }

  changeTheme() {
    this.store.dispatch(new ToggleTheme());
  }

  changeSize() {
    this.store.dispatch(new ToggleSize());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
