import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.interface';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: [
    './../../shared/shared.css',
    './post-item.component.css',
  ]
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  @Input() isTitleRoutable: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.post) {
      throw new Error('PostItemComponent requires post attribute!');
    }
  }

  onTitleClick() {
    if (this.isTitleRoutable) {
      this.router.navigate(['posts', this.post.string_id]);
    }
  }

  onUserNameClick() {
    this.router.navigate(['users', this.post.user.string_id]);
  }

}
