import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private user: User;
  private routeDataSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data
      .subscribe((data: { user: User }) => {
        this.user = data.user;
      }, error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }

}
