import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';
import { PaginatedResponse } from '../../shared/paginator/paginated-response.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  results: PaginatedResponse<User>;
  trackById: Function;
  sortOptions = [
    { value: 'created_at', text: 'Created At' },
    { value: 'name', text: 'Name' },
    { value: 'posts_count', text: 'Posts Count' },
    { value: 'comments_count', text: 'Comments Count' },
  ];

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private messageService: MessageService,
  ) {
    this.trackById = this.commonService.trackById;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { users: PaginatedResponse<User> }) => {
      this.results = data.users;
    }, error => {
      this.messageService.error(error);
    });
  }

  onResultsFetched(response: PaginatedResponse<User>) {
    this.results = response;
  }

}
