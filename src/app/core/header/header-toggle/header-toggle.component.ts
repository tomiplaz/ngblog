import { Component, OnInit, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header-toggle',
  templateUrl: './header-toggle.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './header-toggle.component.css',
  ]
})
export class HeaderToggleComponent implements OnInit, OnDestroy {

  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly CLOSED_TEXT = 'Show';
  readonly OPENED_TEXT = 'Hide';

  private isClosed: boolean;
  private isClosedSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private isClosedSubscription: Subscription;
  isClosed$ = this.isClosedSubject.asObservable();

  toggleText: string;

  constructor() { }

  ngOnInit() {
    this.isClosedSubscription = this.isClosed$.subscribe(isClosed => {
      this.isClosed = isClosed;
      this.toggleText = isClosed ? this.CLOSED_TEXT : this.OPENED_TEXT;
      this.toggled.emit(isClosed);
    });
  }

  @HostListener('click')
  onClick() {
    this.isClosedSubject.next(!this.isClosed);
  }

  ngOnDestroy() {
    this.isClosedSubscription.unsubscribe();
  }

}
