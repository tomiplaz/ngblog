import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { data: HomeData }) => {
      this.recentPosts = data.data.posts.recent;
      this.randomPosts = data.data.posts.random;
      this.stats = data.data.stats;
    });
  }

  onUsersClick() {
    this.router.navigate(['users']);
  }

  onPostsClick() {
    this.router.navigate(['posts']);
  }

}
