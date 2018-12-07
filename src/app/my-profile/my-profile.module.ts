import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileFormComponent } from './my-profile/my-profile-form/my-profile-form.component';
import { ChangePasswordFormComponent } from './my-profile/change-password-form/change-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MyProfileComponent,
    MyProfileFormComponent,
    ChangePasswordFormComponent,
  ]
})
export class MyProfileModule { }
