import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { posts: Post[] }) => {
        this.posts = data.posts;
      }, error => {
        console.log(error);
      });
  }

  trackById(index: number, post: Post) {
    return post.id;
  }

}
