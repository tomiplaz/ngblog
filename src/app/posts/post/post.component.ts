import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.interface';
import { Comment } from '../comment.interface';
import { CommonService } from '../../core/common.service';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;
  trackById: Function;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private messageService: MessageService,
  ) {
    this.trackById = this.commonService.trackById;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { post: Post }) => {
      this.post = data.post;
    }, error => {
      this.messageService.error(error);
    });
  }

  onCommentAdded(comment: Comment) {
    this.post.comments = [ comment, ...this.post.comments ];
    this.post.comments_count++;
  }

}
