import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: Comment;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.comment) {
      throw new Error('CommentItemComponent requires comment attribute!');
    }
  }

  onUserNameClick() {
    this.router.navigate(['users', this.comment.user.string_id]);
  }

}
