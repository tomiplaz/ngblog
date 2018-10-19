import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './breadcrumbs.component.css',
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  private breadcrumbs: string[] = [];
  private navigationEndEventsSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
      .subscribe(() => this.buildBreadcrumbs());
  }

  private buildBreadcrumbs() {
    this.breadcrumbs = this.router.url.split('/').slice(1);
  }

  private onClick(index: number, isLast: boolean) {
    const commands = this.breadcrumbs.slice(0, index + 1);
    if (!isLast) this.router.navigate(commands);
  }

  ngOnDestroy() {
    this.navigationEndEventsSubscription.unsubscribe();
  }

}
