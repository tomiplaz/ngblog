import { Component, OnInit, Output, OnDestroy, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit, OnDestroy {

  readonly defaultValue = 'created_at';

  sort = new FormControl(this.defaultValue);
  @Output() changed = new EventEmitter<{ sort: string }>();
  @Input() options: { value: string, text: string }[];
  private valueSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.options) {
      throw new Error('OrderComponent requires options attribute!');
    }

    const initialValue = this.route.snapshot.queryParamMap.get('sort') || this.defaultValue;

    this.sort.setValue(initialValue);

    this.valueSubscription = this.sort.valueChanges.subscribe(value => {
      this.changed.emit({ sort: value });
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
