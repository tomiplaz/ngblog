import { Component, OnInit, HostListener, HostBinding, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Theme } from '../../store/settings/settings.values';
import { AppState } from '../../store/store';
import { ToggleFooter } from '../../store/session/session.actions';
import { Subscription } from 'rxjs/Subscription';
import { selectTheme } from '../../store/settings/settings.selectors';
import { selectIsFooterOpen } from '../../store/session/session.selectors';

@Component({
  selector: 'app-footer-toggle',
  templateUrl: './footer-toggle.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './footer-toggle.component.css',
  ]
})
export class FooterToggleComponent implements OnInit, OnDestroy {

  @HostBinding('class') classAttribute: Theme;

  private themeSubscription: Subscription;
  isFooterOpen$ = this.store.pipe(select(selectIsFooterOpen));

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.themeSubscription = this.store.pipe(select(selectTheme)).subscribe(theme => {
      this.classAttribute = theme;
    });
  }

  @HostListener('click')
  onClick() {
    this.store.dispatch(new ToggleFooter());
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
