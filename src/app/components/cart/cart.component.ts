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
  cvArr: string = "";
  ts = {};
  totalPrice = 0;
  Formatnum: any = 0;
  countCart: number = 0;
  calper: number = 0;
  Formatcalper: any = 0;
  totalPriceaftercalper: number = 0;
  FormattotalPriceaftercalper: any = 0;
  discount: string = "0%";
  arrMovies: any;
  cvarrMovies: string = "";
  popup: string = "none";

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
    console.log(this.countCart)
  }




  addToCart() {
    if (this.dataMovie !== "") {
      this.dataArrCart.name = this.dataMovie;
      this.dataArrCart.amount = 1;
      this.dataArrCart.price = 0;

      console.log("this.dataArrCart :", this.dataArrCart)

      this.arr.push(this.dataArrCart)
      console.log("this.arr :", this.arr)
      this.cvArr = JSON.stringify(this.arr)

      localStorage.setItem('arrDataCart', this.cvArr)
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
    let arrPrice:any = [];
    const arrMovies = JSON.parse(this.dataNameMovies!)
    arrMovies.forEach((element: any, i: number) => {
      this.totalPrice += element["amount"] * element["price"]
      // console.log(this.totalPrice)
      this.countCart += element["amount"]
    });

    if (this.countCart > 3 && this.countCart < 6) {
      this.discount = "-10%"
      this.calper = 10 / 100 * this.totalPrice
      this.totalPriceaftercalper = this.totalPrice - this.calper
      console.log("ttal10%", this.totalPriceaftercalper)
    }
    else if (this.countCart > 5) {
      this.discount = "-20%"
      this.calper = 20 / 100 * this.totalPrice
      this.totalPriceaftercalper = this.totalPrice - this.calper
      console.log("ttal20%", this.totalPriceaftercalper)
    }
    else {
      this.totalPriceaftercalper = this.totalPrice
      console.log("ttal0%",this.totalPriceaftercalper)
    }
    
    this.Formatnum = new Intl.NumberFormat().format(this.totalPrice);
    this.Formatcalper = new Intl.NumberFormat().format(this.calper);
    this.FormattotalPriceaftercalper = new Intl.NumberFormat().format(this.totalPriceaftercalper);
    console.log("ttalfn", this.totalPriceaftercalper)


    arrPrice.push(this.totalPrice,this.calper,this.countCart,this.totalPriceaftercalper)
    // console.log(arrPrice)
    let cvtotalTostr = JSON.stringify(arrPrice)
    localStorage.setItem('totalPrice',  cvtotalTostr)
  }

  findData() {
    console.log("this.dataNameMovies in find data :", this.dataNameMovies)
    this.addToCart()
    this.arrMovies = JSON.parse(this.dataNameMovies!)
    this.arrMovies.forEach((element: any, i: number) => {

      if (this.dataMovie === element["name"]) {
        console.log("arrMovies", this.arrMovies)
        element["amount"] += 1;
        const cvarrMovies = JSON.stringify(this.arrMovies)
        console.log("arrMovies:", this.arrMovies, cvarrMovies)
        localStorage.setItem('arrDataCart', cvarrMovies)
      }


    });


    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


  clearLocalStorage() {
    localStorage.setItem('arrDataCart', '[]')
    localStorage.setItem('totalPrice', '[]')
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  decreaseAmount(namem: string) {
    this.dataMovie = namem
    this.arrMovies = JSON.parse(this.dataNameMovies!)
    this.arrMovies.forEach((element: any, i: number) => {

      if (this.dataMovie === element["name"]) {
        if (element["amount"] == 1) {
          delete (this.arrMovies[i])
          this.arrMovies.forEach((element: any) => {
            this.arr.push(element)
          });
          // console.log(this.arr)
          this.cvArr = JSON.stringify(this.arr)
          // console.log(this.cvArr) 
          localStorage.setItem('arrDataCart', this.cvArr)
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
        else {
          element["amount"] -= 1;
          this.cvarrMovies = JSON.stringify(this.arrMovies)
          localStorage.setItem('arrDataCart', this.cvarrMovies)
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }

      }


    });
  }

  increaseAmount(namem: string) {
    console.log("dataarrcart", this.dataMovie, namem)
    this.dataMovie = namem
    this.findData()
  }

  addPrice(event: any, price: string, nameM: string) {
    let Price = 0;
    if ("Enter" == event.key) {
      if (price == "") {
        Price = 0
        this.findDataPrice(Price, nameM)
      }
      else {
        Price = parseInt(price)
        this.findDataPrice(Price, nameM)

      }
    }
    else if ("Backspace" == event.key && price == "") {
      alert("กรุณาเพิ่มราคาสินค้าก่อนทำการชำระเงิน")
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  findDataPrice(p: number, name: string) {

    const arrMovies = JSON.parse(localStorage.getItem('arrDataCart')!)
    arrMovies.forEach((element: any, i: number) => {
      if (name === element["name"]) {
        // console.log("elep", element["price"])
        element["price"] = p
        const cvarrMovies = JSON.stringify(arrMovies)
        localStorage.setItem('arrDataCart', cvarrMovies)
        // console.log("arrMovies:", arrMovies, cvarrMovies)
      }
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  checkoutCart() {
    this.arrMovies = JSON.parse(this.dataNameMovies!)
    this.arrMovies.forEach((element: any) => {
      this.arr.push(element.price)
    });
    // console.log(this.arr)
    let checkprice = this.arr.find(item => item === 0)

    if (checkprice === 0) {
      alert("กรุณาเพิ่มราคาสินค้าก่อนทำการชำระเงิน")
    }
    else {
      this.popup = "block";
    }

  }

   funcpopup(event:any){
    // console.log('hi',event)
    
    this.popup = event;

   }


}
