import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';
import { PaginatedResponse } from '../../shared/paginator/paginated-response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  results: PaginatedResponse<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { users: PaginatedResponse<User> }) => {
      this.results = data.users;
    }, error => {
      this.messageService.error(error);
    });
  }

  onUserNameClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

  onResultsFetched(response: PaginatedResponse<User>) {
    this.results = response;
  }

}
