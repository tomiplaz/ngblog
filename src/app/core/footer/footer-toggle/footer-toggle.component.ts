import { Component, OnInit, HostListener, OnDestroy, Output, EventEmitter, HostBinding } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService, Theme } from '../../settings.service';

@Component({
  selector: 'app-footer-toggle',
  templateUrl: './footer-toggle.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './footer-toggle.component.css',
  ]
})
export class FooterToggleComponent implements OnInit, OnDestroy {

  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class.light') isLight: boolean;
  @HostBinding('class.dark') isDark: boolean;

  readonly CLOSED_TEXT = 'Show';
  readonly OPENED_TEXT = 'Hide';

  private isClosed: boolean;
  private isClosedSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private isClosedSubscription: Subscription;
  private themeSubscription: Subscription;

  isClosed$ = this.isClosedSubject.asObservable();
  toggleText: string;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.isClosedSubscription = this.isClosed$.subscribe(isClosed => {
      this.isClosed = isClosed;
      this.toggleText = isClosed ? this.CLOSED_TEXT : this.OPENED_TEXT;
      this.toggled.emit(isClosed);
    });
    this.themeSubscription = this.settingsService.theme$.subscribe(theme => {
      this.isLight = theme === Theme.Light;
      this.isDark = theme === Theme.Dark;
    });
  }

  @HostListener('click')
  onClick() {
    this.isClosedSubject.next(!this.isClosed);
  }

  ngOnDestroy() {
    this.isClosedSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

}
