import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';
import { PaginatedResponse } from '../../shared/paginator/paginated-response';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  results: PaginatedResponse<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { posts: PaginatedResponse<Post> }) => {
      this.results = data.posts;
    }, error => {
      this.messageService.error(error);
    });
  }

  onPostTitleClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

  onResultsFetched(response: PaginatedResponse<Post>) {
    this.results = response;
  }

}
