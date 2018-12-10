import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginatedResponse } from './paginated-response';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() results: PaginatedResponse<any>;
  @Output() resultsFetched: EventEmitter<PaginatedResponse<any>> = new EventEmitter<PaginatedResponse<any>>();

  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    if (!this.results) {
      throw new Error('PaginationComponent requires results: PaginatedResponse property!');
    }
  }

  onPrevClick() {
    if (this.results.prev_page_url) {
      this.fetchResults(this.results.prev_page_url);
    }
  }

  onNextClick() {
    if (this.results.next_page_url) {
      this.fetchResults(this.results.next_page_url);
    }
  }

  private fetchResults(url: string) {
    this.httpClient.get(url).subscribe((response: PaginatedResponse<any>) => {
      this.resultsFetched.next(response);
    });
  }

}
