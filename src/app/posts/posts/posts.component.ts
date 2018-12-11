import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';
import { PaginatedResponse } from '../../shared/paginator/paginated-response.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  results: PaginatedResponse<Post>;
  trackById: Function;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private messageService: MessageService,
  ) {
    this.trackById = this.commonService.trackById;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { posts: PaginatedResponse<Post> }) => {
      this.results = data.posts;
    }, error => {
      this.messageService.error(error);
    });
  }

  onResultsFetched(response: PaginatedResponse<Post>) {
    this.results = response;
  }

}
