import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiModule } from './api/api.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MessageService } from './message.service';
import { LoggedInGuard } from './logged-in-guard.service';

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
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    MessageService,
    LoggedInGuard,
  ]
})
export class CoreModule { }
