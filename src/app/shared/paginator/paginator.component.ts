import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginatedResponse } from './paginated-response.interface';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  RESULTS_REQUIRED = 'PaginationComponent requires results: PaginatedResponse property!';

  @Input() results: PaginatedResponse<any>;
  @Input() scrollToTopOnFetch = true;
  @Output() resultsFetched: EventEmitter<PaginatedResponse<any>> = new EventEmitter<PaginatedResponse<any>>();

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    if (!this.results) {
      throw new Error(this.RESULTS_REQUIRED);
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
      if (this.scrollToTopOnFetch) {
        window.scrollTo(0, 0);
      }

      this.resultsFetched.next(response);
    }, response => {
      this.messageService.error(response);
    });
  }

}
