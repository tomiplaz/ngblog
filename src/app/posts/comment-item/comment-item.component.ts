import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment.interface';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  readonly COMMENT_REQUIRED = 'CommentItemComponent requires comment attribute!';

  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
    if (!this.comment) {
      throw new Error(this.COMMENT_REQUIRED);
    }
  }

}
