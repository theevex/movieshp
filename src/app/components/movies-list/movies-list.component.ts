import {  Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],

})
export class MoviesListComponent implements OnInit {
  Movie: string = "";
  Page = localStorage.getItem('pagenumber')
  Pagenumber: string = "";
  cvnum = Number(this.Page);
  totalPage:number=0;
  FormatTotalPage:any; 


  ngOnInit(): void {
    this.Main.getPoppularMovies()
  }


  constructor(private api: APIService) {
    console.log(this.Page)
  }




  url = {
    image: 'https://image.tmdb.org/t/p/w500',
    moviespopular: 'https://api.themoviedb.org/3/movie/popular?api_key=d0d41b551324726904e1e52aac39835c&language=en-US&page=',
  };

  data = {
    poppulaMovies: [] as any,
  };

  Main = {
    getPoppularMovies: () => {
      this.api.get(this.url.moviespopular + this.Page).subscribe(res => {
        this.data.poppulaMovies = res.results
        this.totalPage = res.total_pages
        this.FormatTotalPage = new Intl.NumberFormat().format(this.totalPage)
      }, err => {
        console.log(err.error);
      });
    },
  };


  passData(nameMovie: string) {
    this.Movie = nameMovie
  }

  prevpage() {
    let cvPagenumber = Number(this.Page)
    // console.log(cvPagenumber)
    let Pagen = cvPagenumber;
    if (cvPagenumber > 1) {
      Pagen -= 1
      this.Pagenumber = JSON.stringify(Pagen)
      localStorage.setItem('pagenumber', this.Pagenumber)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

  }


  nextpage() {
    let cvPagenumber = Number(this.Page)

    const Pagen = cvPagenumber += 1
    this.Pagenumber = JSON.stringify(Pagen)
    localStorage.setItem('pagenumber', this.Pagenumber)
    //  console.log( cvPagenumber)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  totop() {
    window.scrollTo(0, 0);
  }





}







