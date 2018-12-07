import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileFormComponent } from './my-profile/my-profile-form/my-profile-form.component';

@NgModule({
  imports: [
    CommonModule,
    MyProfileRoutingModule
  ],
  declarations: [
    MyProfileComponent,
    MyProfileFormComponent,
  ]
})
export class MyProfileModule { }
