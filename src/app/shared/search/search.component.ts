import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() changed: Function;

  search = new FormControl('', [Validators.maxLength(50)]);

  private valueSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (!this.changed) {
      throw new Error('SearchComponent requires changed attribute!');
    }

    this.valueSubscription = this.search.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe(value => {
        if (this.search.status === 'VALID') {
          this.changed(value);
        }
      });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
