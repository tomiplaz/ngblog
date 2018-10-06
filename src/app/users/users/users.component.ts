import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.interface';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { users: User[] }) => {
        this.users = data.users;
      }, error => {
        console.log(error);
      });
  }

  onUserNameClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

}
