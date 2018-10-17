import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.interface';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: [
    './../../shared/shared.css',
    './user-item.component.css',
  ]
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  @Input() isNameRoutable: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.user) {
      throw new Error('UserItemComponent requires user attribute!');
    }
  }

  onNameClick() {
    if (this.isNameRoutable) {
      this.router.navigate(['users', this.user.string_id]);
    }
  }

  onPostsClick() {
    this.router.navigate(['posts'], { queryParams: { user: this.user.string_id } });
  }

}
