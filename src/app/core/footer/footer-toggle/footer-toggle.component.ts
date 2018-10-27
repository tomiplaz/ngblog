import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Theme } from '../../store/settings/settings.values';
import { AppState } from '../../store/store';
import { ToggleFooter } from '../../store/session/session.actions';

@Component({
  selector: 'app-footer-toggle',
  templateUrl: './footer-toggle.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './footer-toggle.component.css',
  ]
})
export class FooterToggleComponent implements OnInit {

  @HostBinding('class') classAttribute: Theme;

  readonly CLOSED_TEXT = 'Show';
  readonly OPEN_TEXT = 'Hide';

  toggleText: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(store => {
      this.classAttribute = store.settings.theme;
      this.toggleText = store.session.isFooterOpen ? this.OPEN_TEXT : this.CLOSED_TEXT;
    });
  }

  @HostListener('click')
  onClick() {
    this.store.dispatch(new ToggleFooter());
  }

}
