import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { ApiModule } from './api/api.module';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessageService } from './message.service';
import { CommonService } from './common.service';
import { LoggedInGuard } from './logged-in-guard.service';
import { BreadcrumbsComponent } from './header/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { store } from './store/store';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-center',
    }),
    StoreModule.forRoot(store),
    FontAwesomeModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    MessageService,
    CommonService,
    LoggedInGuard,
  ]
})
export class CoreModule { }
