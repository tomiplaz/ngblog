import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../core/store/store';
import { selectUser } from '../../../core/store/auth/auth.selectors';
import { User } from '../../../users/user.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  tags: String[] = [];
  private userSubscription: Subscription;
  private userId: number;
  @Input() submit: Function;
  @Input() isWaitingForResponse: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(245)]],
      content: [null, [Validators.required]],
      tag: [null, [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.maxLength(20)]],
    });
    this.userSubscription = this.store.pipe(select(selectUser)).subscribe((user: User) => {
      this.userId = user ? user.id : null;
    });
  }

  addTag() {
    if (this.tags.indexOf(this.postForm.controls.tag.value) === -1) {
      this.tags.push(this.postForm.controls.tag.value);
      this.handleTagsChange();
    }
    this.postForm.controls.tag.reset();
  }

  onAddTagClick() {
    this.addTag();
  }

  onTagInputKeyPress(event) {
    if ([' ', ',', 'Enter'].indexOf(event.key) !== -1) {
      event.preventDefault();
      this.addTag();
    }
  }

  onTagClick(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.handleTagsChange();
  }

  private handleTagsChange() {
    // Conditionally enable or disable the control
    if (this.tags.length >= 5 && !this.postForm.controls.tag.disabled) {
      this.postForm.controls.tag.disable();
    } else if (this.tags.length < 5 && this.postForm.controls.tag.disabled) {
      this.postForm.controls.tag.enable();
    }
  }

  onSubmit() {
    delete this.postForm.value.tag;
    this.submit({
      ...this.postForm.value,
      tags: this.tags,
      user_id: this.userId,
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
