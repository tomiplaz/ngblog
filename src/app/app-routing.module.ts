import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoggedInGuard } from './core/logged-in-guard.service';
import { MyProfileComponent } from './users/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [ LoggedInGuard ],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [ LoggedInGuard ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppRoutingModule { }
