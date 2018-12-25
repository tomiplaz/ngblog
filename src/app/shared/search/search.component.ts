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

  search: FormControl;
  @Output() changed = new EventEmitter<{ search: string }>();
  private valueSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.changed) {
      throw new Error('SearchComponent requires changed event handler!');
    }

    this.search = new FormControl(
      this.route.snapshot.queryParamMap.get('search') || '',
      [Validators.maxLength(50)]
    );

    this.valueSubscription = this.search.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged(), filter(() => this.search.status === 'VALID'))
      .subscribe(value => this.changed.emit({ search: value ? value : undefined }));
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

}
