import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  search = new FormControl('', [Validators.maxLength(50)]);
  @Output() changed = new EventEmitter<{ search: string }>();
  private valueSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (!this.changed) {
      throw new Error('SearchComponent requires changed event handler!');
    }

    this.valueSubscription = this.search.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged(), filter(() => this.search.status === 'VALID'))
      .subscribe(value => this.changed.emit({ search: value ? value : undefined }));
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
