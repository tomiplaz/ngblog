import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiModule } from './api/api.module';

import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MessageService } from './message.service';
import { CommonService } from './common.service';
import { LoggedInGuard } from './logged-in-guard.service';
import { BreadcrumbsComponent } from './navigation/breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000
    })
  ],
  declarations: [
    NavigationComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent
  ],
  exports: [
    NavigationComponent,
  ],
  providers: [
    MessageService,
    CommonService,
    LoggedInGuard,
  ]
})
export class CoreModule { }
