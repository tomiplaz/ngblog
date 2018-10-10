import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment.interface';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: [
    './../../shared/shared.css',
    './comment-item.component.css',
  ]
})
export class CommentItemComponent implements OnInit {

  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
    if (!this.comment) {
      throw new Error('CommentItemComponent requires comment attribute!');
    }
  }

}
