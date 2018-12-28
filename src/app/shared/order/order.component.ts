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

  order: FormControl;
  @Output() changed = new EventEmitter<{ order: string }>();
  private valueSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.order = new FormControl(this.route.snapshot.queryParamMap.get('order') || 'desc');

    this.valueSubscription = this.order.valueChanges.subscribe(value => {
      this.changed.emit({ order: value });
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
