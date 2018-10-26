import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostsService } from '../../core/api/posts.service';
import { MessageService } from '../../core/message.service';
import { Comment } from '../comment.interface';
import { AppStore } from '../../core/store/store';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './comment-form.component.css',
  ]
})
export class CommentFormComponent implements OnInit {

  private commentForm: FormGroup;
  private userId: number;
  @Input() postId: number;
  @Output() commentAdded: EventEmitter<Comment> = new EventEmitter<Comment>();

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private messageService: MessageService,
    private store: Store<AppStore>,
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      text: [null, Validators.required],
    });
    this.store.subscribe(store => {
      this.userId = store.auth.user ? store.auth.user.id : null;
    });
  }

  onSubmit() {
    const submitData = {
      ...this.commentForm.value,
      user_id: this.userId,
    };

    this.postsService.createComment(this.postId, submitData).subscribe(response => {
      this.messageService.createCommentSuccess();
      this.commentForm.reset();
      this.commentAdded.emit(response);
    }, response => {
      this.messageService.error(response);
    });
  }

}
