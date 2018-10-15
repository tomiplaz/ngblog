import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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
  private sanitizedPostContent: string;

  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    if (!this.post) {
      throw new Error('PostItemComponent requires post attribute!');
    }
    this.sanitizedPostContent = this.domSanitizer.sanitize(SecurityContext.HTML, this.post.content);
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
