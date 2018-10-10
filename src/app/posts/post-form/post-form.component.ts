import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../core/api/login.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './post-form.component.css',
  ]
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  tags: String[] = [];
  @Input() submit: any; 

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      tag: [null, Validators.pattern(/^[a-zA-Z0-9]+$/)],
    });
  }

  addTag() {
    if (this.tags.indexOf(this.postForm.controls.tag.value) === -1) {
      this.tags.push(this.postForm.controls.tag.value);
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

  onSubmit() {
    delete this.postForm.value.tag;
    this.submit({
      ...this.postForm.value,
      tags: this.tags,
      user_id: this.loginService.getUserId(),
    });
  }

}
