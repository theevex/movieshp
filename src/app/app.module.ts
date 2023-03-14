import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchmovieComponent } from './components/searchmovie/searchmovie.component';
import { PopupComponent } from './components/popup/popup.component';
import { PagenofoundComponentComponent } from './components/pagenofound-component/pagenofound-component.component'


  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MoviesListComponent,
    CartComponent,
    SearchmovieComponent,
    PopupComponent,
    PagenofoundComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
