import { Component, OnInit, Output, OnDestroy, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit, OnDestroy {

  sort = new FormControl('created_at');
  @Output() changed = new EventEmitter<{ sort: string }>();
  @Input() options: { value: string, text: string }[];
  private valueSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (!this.changed) {
      throw new Error('OrderComponent requires changed event handler!');
    }

    if (!this.options) {
      throw new Error('OrderComponent requires options attribute!');
    }

    this.valueSubscription = this.sort.valueChanges.subscribe(value => {
      this.changed.emit({ sort: value });
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
