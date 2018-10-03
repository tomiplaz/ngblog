import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../../core/api/posts.service';
import { LoginService } from '../../core/api/login.service';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup;
  @Input() postId: number;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private loginService: LoginService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      text: [null, Validators.required],
    });
  }

  onSubmit() {
    const submitData = {
      ...this.commentForm.value,
      user_id: this.loginService.getUserId(),
    };

    this.postsService.createPostComment(this.postId, submitData)
      .subscribe(response => {
        this.messageService.createPostCommentSuccess();
      }, response => {
        this.messageService.error(response);
        this.commentForm.reset();
      });
  }

}
