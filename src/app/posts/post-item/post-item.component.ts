import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { faEye, faComments, faTags, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../post.interface';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  readonly POST_REQUIRED = 'PostItemComponent requires post attribute!';

  @Input() post: Post;
  @Input() isPreview = true;
  sanitizedPostContent: string;

  faEye = faEye;
  faComments = faComments;
  faTags = faTags;
  faCalendarAlt = faCalendarAlt;
  faUser = faUser;

  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    if (!this.post) {
      throw new Error(this.POST_REQUIRED);
    }
    this.sanitizedPostContent = this.domSanitizer.sanitize(SecurityContext.HTML, this.post.content);
  }

  onTitleClick() {
    if (this.isPreview) {
      this.router.navigate(['/posts', this.post.key]);
    }
  }

}
