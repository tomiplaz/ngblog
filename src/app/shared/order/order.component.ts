import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  order = new FormControl();
  @Output() changed = new EventEmitter<{ order: string }>();
  valueSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const initialValue = this.route.snapshot.queryParamMap.get('order') || 'desc';

    this.order.setValue(initialValue);

    this.valueSubscription = this.order.valueChanges.subscribe(value => {
      this.changed.emit({ order: value });
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
