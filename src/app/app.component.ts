import { Component, OnInit, OnDestroy, HostBinding, HostListener, ViewChild, ElementRef, Host } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from './core/api/login.service';
import { AppStore } from './core/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  @HostBinding('class') classAttribute: string;
  @HostBinding('class.header-list-horizontal') isHeaderListHorizontal: boolean = false;

  private loggedInUserSubscription: Subscription;

  constructor(private store: Store<AppStore>, private loginService: LoginService) { }

  ngOnInit() {
    this.store.subscribe(store => {
      this.classAttribute = [
        store.settings.theme,
        store.settings.size,
        ...store.session.isHeaderOpen ? [] : ['header-closed'],
      ].join(' ');
    });

    this.loggedInUserSubscription = this.loginService.loggedInUser$.subscribe(user => {
      this.isHeaderListHorizontal = !user;
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const top = this.content.nativeElement.getBoundingClientRect().top;
  }

  ngOnDestroy() {
    this.loggedInUserSubscription.unsubscribe();
  }

}
