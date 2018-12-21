import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  order = new FormControl('desc');
  @Output() changed = new EventEmitter<{ order: string }>();
  private valueSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (!this.changed) {
      throw new Error('OrderComponent requires changed event handler!');
    }

    this.valueSubscription = this.order.valueChanges.subscribe(value => {
      this.changed.emit({ order: value });
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
