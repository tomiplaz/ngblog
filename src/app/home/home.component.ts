import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeData, Stats } from './home-data.interface';
import { Post } from '../posts/post.interface';
import { CommonService } from '../core/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentPosts: Post[];
  randomPosts: Post[];
  stats: Stats;
  trackById: Function;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
    this.trackById = this.commonService.trackById;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { data: HomeData }) => {
      this.recentPosts = data.data.posts.recent;
      this.randomPosts = data.data.posts.random;
      this.stats = data.data.stats;
    });
  }

}
