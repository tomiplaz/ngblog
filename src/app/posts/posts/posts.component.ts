import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.interface';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { posts: Post[] }) => {
        this.posts = data.posts;
      }, error => {
        console.log(error);
      });
  }

  onPostTitleClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

}
