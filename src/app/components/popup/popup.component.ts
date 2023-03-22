import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import * as generatePayload from 'promptpay-qr';
import * as QRCode from 'qrcode';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  arrPrice = localStorage.getItem('totalPrice')
  cvarrPrice: any;
  dataNameMovies = localStorage.getItem('arrDataCart');
  dataMovies: {} = JSON.parse(this.dataNameMovies!);
  totalOrder: number = 0;
  qrcode: any;
  minutes: number = 0;
  secound: number = 59;
  displaydivqr: string;
  displaydivaddress = "none";
  Intervalqr: any;
  optPv: any;
  optDt: any;
  finddistrict: any;
  findSubdistrict: any;
  zipcode: any;
  choosepm: number = 0;
  htmlToAdd: any;
  renderer: any;
  subTotal: any;
  discount: any;
  amount: any;
  Total: any;

  constructor(private api: APIService, private rd: Renderer2) {
    this.cvarrPrice = JSON.parse(this.arrPrice!)
    this.fetchfunc.getProvince();
    this.fetchfunc.getdistrict();
    this.fetchfunc.getSubdistrict();
    this.looparrprice()

  }


  @Output() closePopup = new EventEmitter();

  @ViewChild('qrcode') divqr: ElementRef;
  @ViewChild('imgqrcode') divimgqr: ElementRef;
  @ViewChild('childqrcode') divchqr: ElementRef;
  @ViewChild('address') divaddress: ElementRef;


  closepopup() {
    this.closePopup.emit('none')
  }

  data = {
    province: [] as any,
    district: [] as any,
    Subdistrict: [] as any
  }

  master = {
    Province: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json',
    District: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json',
    Subdistrict: 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json'
  }

  fetchfunc = {
    getProvince: () => {
      this.api.get(this.master.Province).subscribe(res => {
        this.data.province = res
        console.log(this.data.province)
      }, err => {
        console.log(err.error);
      }
      )
    },
    getdistrict: () => {
      this.api.get(this.master.District).subscribe(res => {
        this.data.district = res
        console.log(this.data.district)
      }, err => {
        console.log(err.error);
      })
    },
    getSubdistrict: () => {
      this.api.get(this.master.Subdistrict).subscribe(res => {
        this.data.Subdistrict = res
        console.log(this.data.Subdistrict)
      })
    }


  }



  createQr() {
    this.displaydivqr = 'block'

    this.choosepm = 1
    this.displaydivaddress = "none";
    this.displaydivqr = "block";
    const mobileNumber = '095-594-1260'
    this.totalOrder = this.cvarrPrice[3]
    const amount = this.totalOrder
    const payload = generatePayload(mobileNumber, { amount })

    if (this.minutes == 0 && this.secound == 59) {
      const options = { color: { dark: '#0080FE', light: '#ffffff00' } }
      QRCode.toString(payload, options, (err: any, svg: any) => {
        this.divimgqr.nativeElement.insertAdjacentHTML('beforeEnd', svg)
      })
      this.countDowntime()
    }

  }


  countDowntime() {

    if (this.minutes >= 0 && this.secound > 0) {
      this.Intervalqr = setInterval(() => {
        if (this.minutes >= 0 && this.secound > 0) {
          this.secound -= 1
          // console.log(this.minutes, typeof this.secound)
          if (this.minutes > 0 && this.secound == 0) {
            this.minutes -= 1
            this.secound = 59
          }
        }
        else if (this.minutes == 0 && this.secound == 0) {
          clearInterval(this.Intervalqr);
          this.divchqr.nativeElement.remove();
          this.displaydivqr = 'none'
        }
      }, 1000);
    }
    else if (this.minutes == 0 && this.secound == 0) {
      clearInterval(this.Intervalqr);
      this.divchqr.nativeElement.remove();
    }
    else {
      // alert("กรุณาทำการสั่งซื้อใหม่ค่ะ") 
    }
  }


  cod() {
    this.choosepm = 2
    this.displaydivaddress = "block"
    this.displaydivqr = "none"
    // this.displaydivpromtpay = 'none';

    // clearInterval(this.Intervalqr);

    // if (this.secound == 0 && this.minutes == 0) {
    //   this.divchqr.nativeElement.remove()
    // }
    // else if (this.secound > 0) {
    //   this.countDowntime()
    // }
  }

  selectedprovince() {
    this.finddistrict = this.data.district.filter((e: any) => this.optPv == e.province_id)
  }

  selecteddistict() {
    this.findSubdistrict = this.data.Subdistrict.filter((e: any) => this.optDt == e.amphure_id)
  }

  looparrprice() {
    this.subTotal = new Intl.NumberFormat().format(this.cvarrPrice[0]);
    this.discount = new Intl.NumberFormat().format(this.cvarrPrice[1]);
    this.amount = new Intl.NumberFormat().format(this.cvarrPrice[2]);
    this.Total = new Intl.NumberFormat().format(this.cvarrPrice[3]);
  }
}
