import { Component, OnInit, HostListener, HostBinding, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Theme } from '../../store/settings/settings.values';
import { AppState } from '../../store/store';
import { ToggleHeader } from '../../store/session/session.actions';
import { Subscription } from 'rxjs/Subscription';
import { selectIsHeaderOpen } from '../../store/session/session.selectors';
import { selectTheme } from '../../store/settings/settings.selectors';

@Component({
  selector: 'app-header-toggle',
  templateUrl: './header-toggle.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './header-toggle.component.css',
  ]
})
export class HeaderToggleComponent implements OnInit, OnDestroy {

  @HostBinding('class') classAttribute: Theme;

  private themeSubscription: Subscription;
  isHeaderOpen$ = this.store.pipe(select(selectIsHeaderOpen));

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.themeSubscription = this.store.pipe(select(selectTheme)).subscribe(theme => {
      this.classAttribute = theme;
    });
  }

  @HostListener('click')
  onClick() {
    this.store.dispatch(new ToggleHeader());
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
