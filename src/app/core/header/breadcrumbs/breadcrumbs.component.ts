import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  breadcrumbs: string[] = [];
  private navigationEndEventsSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe(() => this.buildBreadcrumbs());
  }

  private buildBreadcrumbs() {
    const breadcrumbs = this.router.url.split('/').slice(1);
    const lastIndex = breadcrumbs.length - 1;

    breadcrumbs[lastIndex] = breadcrumbs[lastIndex].replace(/[?|&]/g, (match) => ` ${match} `);

    this.breadcrumbs = breadcrumbs;
  }

  onClick(index: number, isLast: boolean) {
    const commands = this.breadcrumbs.slice(0, index + 1);

    if (!isLast) {
      this.router.navigate(commands);
    }
  }

  ngOnDestroy() {
    this.navigationEndEventsSubscription.unsubscribe();
  }

}
