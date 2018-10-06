import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../../core/api/posts.service';
import { LoginService } from '../../core/api/login.service';
import { MessageService } from '../../core/message.service';
import { Comment } from '../comment.interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup;
  @Input() postId: number;
  @Output() commentAdded: EventEmitter<Comment> = new EventEmitter<Comment>();

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
        this.commentAdded.emit(response);
      }, response => {
        this.messageService.error(response);
        this.commentForm.reset();
      });
  }

}
