import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.interface';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  @Input() isPreview = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.user) {
      throw new Error('UserItemComponent requires user attribute!');
    }
  }

  onNameClick() {
    if (this.isPreview) {
      this.router.navigate(['/users', this.user.name]);
    }
  }

}
