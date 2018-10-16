import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.interface';
import { Comment } from '../comment.interface';
import { CommonService } from '../../core/common.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../core/message.service';
import { PostsService } from '../../core/api/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './post.component.css',
  ]
})
export class PostComponent implements OnInit, OnDestroy {

  private post: Post;
  private routeDataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private messageService: MessageService,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data
      .subscribe((data: { post: Post }) => {
        this.post = data.post;
      }, error => {
        this.messageService.error(error);
      });
  }

  onCommentAdded(comment: Comment) {
    this.post.comments = [ comment, ...this.post.comments ];
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }

}
