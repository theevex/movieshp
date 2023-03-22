import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-movie',
  templateUrl: './description-movie.component.html',
  styleUrls: ['./description-movie.component.css']
})
export class DescriptionMovieComponent {
  yearMovies:any;

  @Input() arrMovie:any;

  url = {
    image: 'https://image.tmdb.org/t/p/w500',
  };
  

  ngOnChanges() {
    console.log(this.arrMovie) 
       this.getyear()
  }

  getyear(){
    let date = new Date(this.arrMovie[0].release_date)
     this.yearMovies = date.getFullYear()
  }
 
}
