import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostItemModule } from './post-item/post-item.module';

@NgModule({
  imports: [
    CommonModule,
    PostItemModule
  ],
  declarations: []
})
export class SharedModule { }
