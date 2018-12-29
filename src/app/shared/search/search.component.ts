import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  readonly DEFAULT_VALUE = '';
  readonly DEBOUNCE_TIME = 250;

  search = new FormControl(this.DEFAULT_VALUE, [Validators.maxLength(50)]);
  @Output() changed = new EventEmitter<{ search: string }>();
  private valueSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const initialValue = this.route.snapshot.queryParamMap.get('search') || this.DEFAULT_VALUE;

    this.search.setValue(initialValue);

    this.valueSubscription = this.search.valueChanges
      .pipe(
        debounceTime(this.DEBOUNCE_TIME),
        distinctUntilChanged(),
        filter(() => this.search.status === 'VALID')
      )
      .subscribe(value => this.changed.emit({ search: value ? value : undefined }));
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
