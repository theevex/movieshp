
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
   widthdiv:string = "0%"
   @ViewChild('divMoveis') divMoveis:ElementRef

 





  constructor(private api: APIService) { }

  url = {
    image: 'https://image.tmdb.org/t/p/w500',
    movies: 'https://api.themoviedb.org/3/trending/movie/week?api_key=d0d41b551324726904e1e52aac39835c',
  };

  master = {
    movies: [] as any,
  };

  ngOnInit(): void {
    this.Master.getMovies();
    localStorage.setItem('pagenumber', '1')
  }

  Master = {
    getMovies: () => {
      this.api.get(this.url.movies).subscribe(res => {
        this.master.movies = res.results;
        // console.log(this.master.movies)
      }, err => {
        console.log(err.error);
      })
    },
  };
  clearLocalStorage() {
    localStorage.setItem('arrDataCart', '[]')
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  

  hidebt(){
    this.widthdiv = "0%"
  }

  showbt(){
    this.widthdiv = "4%"
  }

  prevbt(){
    this.divMoveis.nativeElement.scrollLeft -= 1100
    }
  nextbt(){
  this.divMoveis.nativeElement.scrollLeft += 1100
  }
  
}
