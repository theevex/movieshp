import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  Movie: string = "";
  MoviePrice: number = 0;
  constructor(private api: APIService) {

  }


  ngOnInit(): void {
    this.Main.gatPoppularMovies()
  }

  url = {
    image: 'https://image.tmdb.org/t/p/w500',
    moviespopular: 'https://api.themoviedb.org/3/movie/popular?api_key=d0d41b551324726904e1e52aac39835c&language=en-US&page=1',
  };

  data = {
    poppulaMovies: [] as any,
  };

  Main = {
    gatPoppularMovies: () => {

      this.api.get(this.url.moviespopular).subscribe(res => {
        this.data.poppulaMovies = res.results
        // console.log(res)
      }, err => {
        console.log(err.error);
      });
    },
  };

  passData(nameMovie: string) {
    this.Movie = nameMovie
  }
  addPrice(price: string,nameM:string) {
      let Price = 0;
      Price = parseInt(price)
      console.log(Price)
      this.findDataPrice(Price,nameM)
  }

  findDataPrice(p:number,name:string){

    const arrMovies = JSON.parse(localStorage.getItem('arrDataCart')!)
    arrMovies.forEach((element: any,i:number) => {
      if(name === element["name"]){
       console.log("elep",element["price"])
       element["price"] = p
       const cvarrMovies = JSON.stringify(arrMovies)
    localStorage.setItem('arrDataCart', cvarrMovies)
    console.log("arrMovies:",arrMovies,cvarrMovies)
      }
   

    });


     setTimeout(() => {
        window.location.reload();
      }, 2000);
  }

}






