import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { PagenofoundComponentComponent } from './components/pagenofound-component/pagenofound-component.component';
import { SearchmovieComponent } from './components/searchmovie/searchmovie.component';

const approutes: Routes = [
  {path: 'cart' ,component: CartComponent},
  {path: 'home',component: HomepageComponent},
  {path: 'movies',component: MoviesListComponent},
  {path: 'search/:namemovie',component:SearchmovieComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'search',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PagenofoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
