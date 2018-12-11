import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../core/api/posts.service';
import { MessageService } from '../../core/message.service';
import { Post } from '../../posts/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(
    private router: Router,
    private postsService: PostsService,
    private messageService: MessageService,
  ) {
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(post: Post) {
    this.postsService.createPost(post).subscribe(() => {
      this.messageService.createPostSuccess();
      this.router.navigate(['/posts']);
    }, response => {
      this.messageService.error(response);
    });
  }

}
