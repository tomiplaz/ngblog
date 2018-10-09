import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.interface';
import { CommonService } from '../../core/common.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  private posts: Post[];
  private routeDataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data
      .subscribe((data: { posts: Post[] }) => {
        this.posts = data.posts;
      }, error => {
        console.log(error);
      });
  }

  onPostTitleClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }

}
