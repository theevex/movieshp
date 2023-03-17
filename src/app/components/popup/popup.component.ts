import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import * as generatePayload from 'promptpay-qr';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  arrPrice = localStorage.getItem('totalPrice')
  cvarrPrice:any;
  dataNameMovies = localStorage.getItem('arrDataCart');
  dataMovies: {} = JSON.parse(this.dataNameMovies!);
  totalOrder: number = 0;
  qrcode: any;
  minutes: number = 0;
  secound: number = 59;
  displaydivqr: string;
  displaydivpromtpay = 'auto';
  displaydivaddress = "none";
  Intervalqr:any;

  constructor() {
  }

  @Output() closePopup = new EventEmitter();

  @ViewChild('qrcode') divqr: ElementRef;
  @ViewChild('imgqrcode') divimgqr: ElementRef;
  @ViewChild('childqrcode') divchqr: ElementRef;
  @ViewChild('svg') divsvg: ElementRef;
  @ViewChild('address') divaddress: ElementRef;

  closepopup(){
    this.closePopup.emit('none')
  }

  

  // createQr() {
  //   this.displaydivqr = 'block'
  //   this.displaydivpromtpay = 'none'
  //   const mobileNumber = '095-594-1260'
  //   this.cvarrPrice = JSON.parse(this.arrPrice!)
  //   this.totalOrder = this.cvarrPrice[3]
  //   const amount = this.totalOrder
  //   const payload = generatePayload(mobileNumber, { amount })

  //   QRCode.toString(payload, (err: any, svg: any) => {
  //     this.divimgqr.nativeElement.insertAdjacentHTML('beforeEnd', '<div #svg>' + svg + '</div>');
  //   })

  //   this.countDowntime()

  // }


  // countDowntime(){
  //   this.Intervalqr = setInterval(() => {
  //     if (this.minutes >= 0 && this.secound > 0) {
  //       this.secound -= 1
  //       // console.log(this.minute, this.secound)
  //       if (this.minutes > 0 && this.secound == 0) {
  //         this.minutes -= 1
  //         this.secound = 59
  //       }
  //     }
  //     else if (this.minutes == 0 && this.secound == 0) {
  //       clearInterval(this.Intervalqr);
  //       this.divchqr.nativeElement.remove();
  //      this.displaydivqr = 'none'
  //       this.displaydivpromtpay = 'auto';
  //       // this.divqr.nativeElement.insertAdjacentHTML('beforeEnd', '<div> <p>ชำระเงินได้ที่ประวัติการชำระเงินของท่านค่ะ </p></div>');
  //     }
  //   }, 1000);
  // }


  // cod() {
  //   // this.displaydivqr = 'none'
  //   // this.displaydivpromtpay = 'none';
  //  ;
  //   this.displaydivaddress = "block";
  //   clearInterval(this.Intervalqr);
   
  //   if(this.secound == 0 &&  this.minutes == 0){
  //       this.divchqr.nativeElement.remove()
  //   }
  //   else if(this.secound > 0 ){
  //     this.countDowntime()
  //   }



  // }


}
