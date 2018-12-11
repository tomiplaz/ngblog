import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostsModule } from '../posts/posts.module';
import { HomeDataResolverService } from './home-data-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    PostsModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    HomeDataResolverService,
  ]
})
export class HomeModule { }
