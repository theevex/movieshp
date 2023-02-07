import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dataNameMovies = localStorage.getItem('arrDataCart');
  dataMovies: {} = JSON.parse(this.dataNameMovies!);
  arr: any[] = [];
  ts = {};
  totalPrice = 0;
  Formatnum:any = 0;
  countCart:number = 0;
  calper:number = 0;
  Formatcalper:any = 0;
  totalPriceaftercalper:number = 0;
  FormattotalPriceaftercalper:any = 0;
  discount:string ="0%";

  dataArrCart = {
    name: "",
    amount: 0,
    price: 0
  };



  @Input() dataMovie: string = "";

  constructor() {

    if (this.dataNameMovies == null) {
      localStorage.setItem('arrDataCart', '[]')
    }

  }
  ngOnChanges(changes: any) {
    const ch = changes["dataMovie"]
    if (ch["currentValue"] !== '') {
      alert(" Add " + ch["currentValue"] + " To Cart")
      this.findData()
    }

  }

  ngOnInit(): void {
    if (this.dataMovie !== "") {

      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    this.sumTotal() 
  }




  addToCart() {
    if (this.dataMovie !== "") {
      this.dataArrCart.name = this.dataMovie;
      this.dataArrCart.amount = 1;
      this.dataArrCart.price = 0;

      console.log("this.dataArrCart :", this.dataArrCart)

      const cvdataObjCart = JSON.stringify(this.dataArrCart);
      const arr: [] = [];
      this.arr.push(this.dataArrCart)
      console.log("this.arr :", this.arr)
      const cvArr = JSON.stringify(this.arr)

      localStorage.setItem('arrDataCart', cvArr)
      console.log("arter setIteam :", this.dataNameMovies)

      const t = JSON.parse(this.dataNameMovies!)
      t.push(this.dataArrCart)
      console.log("this.dataArrCart :", t)
      const cvArrR2 = JSON.stringify(t)
      console.log("cvArrR2:", cvArrR2)
      localStorage.setItem('arrDataCart', cvArrR2)
      console.log("arter setIteam2 :", this.dataNameMovies)

    }
    else {
      console.log("data is null")

    }


  }

  sumTotal() {
   
    this.addToCart()
    const arrMovies = JSON.parse(this.dataNameMovies!)
    arrMovies.forEach((element: any, i: number) => {
      
      this.totalPrice += element["amount"] * element["price"]
      console.log (this.totalPrice)
      this.countCart += element["amount"]
      if(this.countCart > 3 && this.countCart < 6){

        this.discount = "-10%"
        this.calper = 10/100*this.totalPrice
        this.totalPriceaftercalper = this.totalPrice - this.calper 
      }
      if(this.countCart > 5){
        this.discount = "-20%"
        this.calper = 20/100*this.totalPrice
        this.totalPriceaftercalper = this.totalPrice - this.calper 
      }
      this.Formatnum = new Intl.NumberFormat().format(this.totalPrice);
      this.Formatcalper = new Intl.NumberFormat().format(this.calper);
      this.FormattotalPriceaftercalper = new Intl.NumberFormat().format(this.totalPriceaftercalper);
    });


  }

  findData() {
    console.log("this.dataNameMovies in find data :", this.dataNameMovies)
    this.addToCart()
    const arrMovies = JSON.parse(this.dataNameMovies!)
    arrMovies.forEach((element: any, i: number) => {

      if (this.dataMovie === element["name"]) {
        console.log("arrMovies", arrMovies)
        element["amount"] += 1;
        this.countCart += i
        const cvarrMovies = JSON.stringify(arrMovies)
        console.log("arrMovies:", arrMovies, cvarrMovies)
        localStorage.setItem('arrDataCart', cvarrMovies)
      }


    });


    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


  clearLocalStorage() {
    localStorage.setItem('arrDataCart', '[]')
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
