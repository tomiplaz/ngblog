import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeDataResolverService } from './home-data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      data: HomeDataResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
