import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import 'rxjs/add/operator/finally';
import { PostsService } from '../../core/api/posts.service';
import { MessageService } from '../../core/message.service';
import { Comment } from '../comment.interface';
import { AppState } from '../../core/store/store';
import { Subscription } from 'rxjs/Subscription';
import { selectUser } from '../../core/store/auth/auth.selectors';
import { User } from '../../users/user.interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit, OnDestroy {

  commentForm: FormGroup;
  isWaitingForResponse: boolean = false;
  private userSubscription: Subscription;
  private userId: number;
  @Input() postId: number;
  @Output() commentAdded: EventEmitter<Comment> = new EventEmitter<Comment>();

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private messageService: MessageService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      text: [null, Validators.required],
    });
    this.userSubscription = this.store.pipe(select(selectUser)).subscribe((user: User) => {
      this.userId = user ? user.id : null;
    });
  }

  onSubmit() {
    const submitData = {
      ...this.commentForm.value,
      user_id: this.userId,
    };

    this.isWaitingForResponse = true;
    this.postsService.createComment(this.postId, submitData)
      .finally(() => this.isWaitingForResponse = false)
      .subscribe(response => {
        this.messageService.createCommentSuccess();
        this.commentForm.reset();
        this.commentAdded.emit(response);
      }, response => {
        this.messageService.error(response);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
