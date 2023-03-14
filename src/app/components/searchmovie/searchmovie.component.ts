import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-searchmovie',
  templateUrl: './searchmovie.component.html',
  styleUrls: ['./searchmovie.component.css']
})
export class SearchmovieComponent implements OnInit{
  Movie: string = "";
  Page = localStorage.getItem('pagenumber')
  cvnum = Number(this.Page)
  Pagenumber: string = "";
  datasearch: any = this.route.snapshot.paramMap.get("namemovie");
  totalpage:number=0;
  totalresult:number=0;


  url = {
    image: 'https://image.tmdb.org/t/p/w500',
    search: ""
  };


  data = {
    moviesearch: [] as any
  };

  Main = {
    searchmovies: () => {
      this.api.get(this.url.search).subscribe(res => {
        // console.log(res)
        this.data.moviesearch = res.results
        this.totalpage = res.total_pages
        this.totalresult = res.total_results
        // console.log("totalpage",this.totalpage)
      }, err => {
        console.log(err.error);
      });
    }
  };

  ngOnInit(): void {
    this.search();
  }

  constructor(private api: APIService, private route: ActivatedRoute, private router: Router) {
    
  }
  passData(nameMovie: string) {
    this.Movie = nameMovie
  }

  search() {
    this.datasearch = this.route.snapshot.paramMap.get("namemovie")
    if (this.datasearch == "") {
      localStorage.setItem('pagenumber', "1")
      this.router.navigate(['/home'])
    }
    else {
        this.setSearchapi()   
    }

  }

  setSearchapi() {
    this.url.search = 'https://api.themoviedb.org/3/search/movie?api_key=d0d41b551324726904e1e52aac39835c&language=en-US&query=' + this.datasearch + '&page=' + this.Page
    this.Main.searchmovies()

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
      }, 500);
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
    }, 500);
  }

}