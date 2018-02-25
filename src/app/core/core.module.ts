import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiModule } from './api/api.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    ApiModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
