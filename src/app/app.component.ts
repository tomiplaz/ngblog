import { Component, OnInit, HostBinding, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from './core/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  @HostBinding('class') classAttribute: string;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.store.subscribe(store => {
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

}
