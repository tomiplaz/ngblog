import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostItemComponent } from './post-item.component';
import { PostItemHeaderComponent } from './post-item-header/post-item-header.component';
import { PostItemContentComponent } from './post-item-content/post-item-content.component';
import { PostItemFooterComponent } from './post-item-footer/post-item-footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PostItemComponent,
    PostItemHeaderComponent,
    PostItemContentComponent,
    PostItemFooterComponent
  ],
  exports: [
    PostItemComponent
  ]
})
export class PostItemModule { }
