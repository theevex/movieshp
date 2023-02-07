 import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  dataLocalStorage = JSON.parse(localStorage.getItem('arrDataCart')!);
  sumCart:number = 0 ;
   
  constructor(){
     this.sumAmountCart()
  }
  sumAmountCart(){
    console.log(this.dataLocalStorage)   
    this.dataLocalStorage.forEach( (element:any) => {
    this.sumCart += element["amount"]
    });
  }



}
