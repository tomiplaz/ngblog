import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CreatePostRoutingModule } from './create-post-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostFormComponent } from './create-post/post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    QuillModule,
  ],
  declarations: [
    CreatePostComponent,
    PostFormComponent,
  ]
})
export class CreatePostModule { }
