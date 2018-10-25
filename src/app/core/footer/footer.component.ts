import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/store';
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
  @HostBinding('class') size: Size;
  @HostBinding('class.closed') isClosed: boolean;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.store.subscribe(store => {
      this.theme = store.settings.theme;
      this.size = store.settings.size;
      this.isClosed = !store.session.isFooterOpen;
    });
  }

  changeTheme() {
    this.store.dispatch(new ToggleTheme());
  }

  changeSize() {
    this.store.dispatch(new ToggleSize());
  }

}
