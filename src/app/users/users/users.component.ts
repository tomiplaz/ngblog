import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';
import { PaginatedResponse } from '../../shared/paginator/paginated-response.interface';
import { UsersService } from '../../core/api/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  results: PaginatedResponse<User>;
  trackById: Function;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private messageService: MessageService,
    private usersService: UsersService,
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

  onSearchChanged(value: string) {
    this.usersService.getUsers(value).subscribe((users: PaginatedResponse<User>) => {
      this.results = users;
    }, error => {
      this.messageService.error(error);
    })
  }

}
