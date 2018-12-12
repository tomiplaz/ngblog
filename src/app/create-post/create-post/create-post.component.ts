import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';
import { PostsService } from '../../core/api/posts.service';
import { MessageService } from '../../core/message.service';
import { Post } from '../../posts/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  isWaitingForResponse: boolean = false;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private messageService: MessageService,
  ) {
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(post: Post) {
    this.isWaitingForResponse = true;
    this.postsService.createPost(post)
      .finally(() => this.isWaitingForResponse = false)
      .subscribe(() => {
        this.messageService.createPostSuccess();
        this.router.navigate(['/posts']);
      }, response => {
        this.messageService.error(response);
      });
  }

}
