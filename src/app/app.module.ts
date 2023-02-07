import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule,Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';

const appRoutes: Routes =[
  {path: 'cart' ,component: CartComponent},
  {path: 'home',component: HomepageComponent},
  {path: 'movies',component: MoviesListComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
]
;


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    HomepageComponent,
    MoviesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:false}
    ),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
