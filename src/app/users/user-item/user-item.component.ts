import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.interface';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  readonly USER_REQUIRED = 'UserItemComponent requires user attribute!';

  @Input() user: User;
  @Input() isPreview = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.user) {
      throw new Error(this.USER_REQUIRED);
    }
  }

  onNameClick() {
    if (this.isPreview) {
      this.router.navigate(['/users', this.user.name]);
    }
  }

}
