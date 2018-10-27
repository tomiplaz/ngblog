import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './user.component.css',
  ]
})
export class UserComponent implements OnInit, OnDestroy {

  user: User;
  private routeDataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    }, error => {
      this.messageService.error(error);
    });
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }

}
