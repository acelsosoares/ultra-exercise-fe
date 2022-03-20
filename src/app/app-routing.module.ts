import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiphyListComponent } from './components/giphy-list/giphy-list.component';

const routes: Routes = [
  {
    path: 'list/:categoryName',
    component: GiphyListComponent
  },
  {
    path: '**',
    redirectTo: '/list/trending',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
