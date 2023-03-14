
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  localstr = localStorage.getItem('arrDataCart');
  dataLocalStorage = JSON.parse(localStorage.getItem('arrDataCart')!);
  sumCart: number = 0;
  InputSearch =localStorage.getItem('inputsearch');
  datasearch = localStorage.getItem('searchdata');
  searchdata:any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.localstr == null) {
      localStorage.setItem('arrDataCart', '[]')
      localStorage.setItem('inputsearch','none')
    }
    else {
      this.sumAmountCart()
    }
  }

  sumAmountCart() {
    console.log(this.dataLocalStorage)
    this.dataLocalStorage.forEach((element: any) => {
      this.sumCart += element["amount"]
    });
  }

  clickIconSearch() {
    localStorage.setItem('inputsearch','block');
    window.location.reload();
  }


  resetsearch() {
    localStorage.setItem('inputsearch','none');
    localStorage.setItem('pagenumber', "1");
    localStorage.setItem('searchdata', "");
    window.location.reload();
  }


  search(e: any) {
    if ("Enter" === e.key) {
      this.datasearch = e.target.value;
      localStorage.setItem('searchdata', e.target.value);
      localStorage.setItem('pagenumber', "1");

      this.redirectPage(this.datasearch);
    }
    if("Backspace" === e.key && e.target.value == ""){
      localStorage.setItem('pagenumber', "1");
      localStorage.setItem('searchdata', "");
      this.router.navigate(['/home']);
    }
  }

  async redirectPage(data: any) {
    this.router.navigate(['/search', data]);

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    })

    window.location.reload();
  }
}
