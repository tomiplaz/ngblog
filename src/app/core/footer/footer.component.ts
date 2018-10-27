import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { Theme, Size } from '../store/settings/settings.values';
import { ToggleTheme, ToggleSize } from '../store/settings/settings.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './footer.component.css',
  ]
})
export class FooterComponent implements OnInit {

  theme: Theme;
  size: Size;
  @HostBinding('class') classAttribute: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(store => {
      this.theme = store.settings.theme;
      this.size = store.settings.size;
      this.classAttribute = [
        store.settings.theme,
        store.settings.size,
        ...store.session.isFooterOpen ? [] : ['closed'],
      ].join(' ');
    });
  }

  changeTheme() {
    this.store.dispatch(new ToggleTheme());
  }

  changeSize() {
    this.store.dispatch(new ToggleSize());
  }

}
