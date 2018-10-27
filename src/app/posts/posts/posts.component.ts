import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.interface';
import { CommonService } from '../../core/common.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './posts.component.css',
  ]
})
export class PostsComponent implements OnInit, OnDestroy {

   posts: Post[];
  private routeDataSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { posts: Post[] }) => {
      this.posts = data.posts;
    }, error => {
      this.messageService.error(error);
    });
  }

  onPostTitleClick(stringId: string) {
    this.router.navigate([stringId], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }

}
