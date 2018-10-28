import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { ApiModule } from './api/api.module';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessageService } from './message.service';
import { CommonService } from './common.service';
import { LoggedInGuard } from './logged-in-guard.service';
import { BreadcrumbsComponent } from './header/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { FooterToggleComponent } from './footer/footer-toggle/footer-toggle.component';
import { store } from './store/store';

@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    StoreModule.forRoot(store),
  ],
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent,
    FooterComponent,
    FooterToggleComponent
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
