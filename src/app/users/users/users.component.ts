import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.interface';
import { CommonService } from '../../core/common.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './users.component.css',
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  private routeDataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
    }, error => {
      this.messageService.error(error);
    });
  }

  onUserNameClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }

}
