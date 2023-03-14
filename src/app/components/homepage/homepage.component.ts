import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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

  cal(change: any) {
    let length = this.callenght(change)
    let arr: any = [];
    let t = length
    let result
    let ts: number = 0
    let hd: number = 0
    let ten: number = 0

    if (change != 0 && change.length < 8) {

      for (let i = 0; i < length; i++) {
        t--
        let zero = ""

        if (change[i] != 0) {
          for (let j = 0; j < t; j++) {
            zero += 0
          }
          result = change[i] + zero
          arr.push(result)
        }
      }

      arr.forEach((element: any) => {
        let length2 = this.callenght(element)
        switch (length2) {
          case 1:
            ten += parseInt(element[0])
            break;
          case 2:
            ten += parseInt(element[0]) * 10
            break;
          case 3:
            hd += parseInt(element[0])
            break;
          case 4:
            if (arr.length < 3) {
              ts += parseInt(element[0])
            }
            else if (arr.length >= 3) {
              ts += parseInt(element[0])
            }
            break;
          case 5:
            ts += parseInt(element[0]) * 10
            break;
          case 6:
            ts += parseInt(element[0]) * 100
            break;
          case 7:
            ts += parseInt(element[0]) * 1000
            break;
        }
      });

      let textfinal = "ยอดถอนเงิน " + new Intl.NumberFormat().format(change) + " บาท "

      if (ts != 0) {
        textfinal += " รับแบงค์พันจำนวน " + ts + " ใบ "
      }
      if (hd != 0) {
        if (hd > 5) {
          textfinal += " รับแบงค์ห้าร้อยจำนวน 1 ใบ และแบงค์ร้อยจำนวน " + (hd - 5) + " ใบ "
        }
        else if (hd == 5) {
          textfinal += " รับแบงค์ห้าร้อยจำนวน 1 ใบ หรือ แบงค์ร้อยจำนวน " + (hd) + " ใบ "
        }
        else {
          textfinal += " รับแบงค์ร้อยจำนวน " + hd + " ใบ "
        }
      }
      if (ten != 0) {
        textfinal += ten + " บาท ไม่สามารถถอนได้ค่ะ"
      }

      alert(textfinal)
    }
    else if (change.length > 7) {
      alert("สามารถถอนเงินได้สูงสุุด 9,999,999 บาท ค่ะ")
    }
    else {
      alert("จำนวนเงิน" + change + " บาท ไม่สามารถถอนได้")
    }

  }

  callenght(c: any) {
    let result = c.length
    return result
  }

}
