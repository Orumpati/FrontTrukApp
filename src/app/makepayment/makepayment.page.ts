import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/compat/app';
import { AuthpaymentService } from '../authpayment.service';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.page.html',
  styleUrls: ['./makepayment.page.scss'],
})
export class MakepaymentPage implements OnInit {
  rzp1:any
  bid: any;
  tenPrice: any;
  payingToNmae: any;
  receivemobile: any;
  filname: any;
  array :any =[]
  checkbox =false
  paymentId: any;
  docid: any;
  viewbidDocId: any;
  constructor(private auth:AuthpaymentService,private modal:ModalController,private alert:AlertController) { }
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'payment successful',
      message: 'Payment successful',
      buttons: ['OK'],
      
    });

    await alert.present();
  }
  ngOnInit() {
    this.bid =JSON.parse(localStorage.getItem('filteredBid') || '{}')
    this.viewbidDocId =JSON.parse(localStorage.getItem('DocId') || '{}')
    console.log(this.bid)
    for(let i=0;i<this.bid.length;i++){
      this.docid = this.bid[i]._id
      this.tenPrice  =this.bid[i].tentativefinalPrice
      this.receivemobile  =this.bid[i].mobileNo
    }

    this.payingToNmae =JSON.parse(localStorage.getItem('regdata') || '{}')
    console.log(this.payingToNmae)
this.array.push(this.payingToNmae)
    this.filname = this.array.filter((data:any)=>{
      console.log(data.mobileNo)
      console.log(this.receivemobile)
     return data.mobileNo === this.receivemobile
    })
    console.log(this.filname)
  }

  options = {
    "key":"rzp_test_qjJfzalIvcjn3q", //"rzp_live_W93qXq63hhLhjQ",//rzp_test_qjJfzalIvcjn3q
    "amount":  100,
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "handler": (response: any) => {
      // Handle the response here
      console.log(response);
      this.paymentId = response.razorpay_payment_id
      this.updatePaymentDetails()
    },
    "order_id": "", 
   //"callback_url": "http://localhost:8100/view-bid",
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

pay(){

  this.rzp1 = new this.auth.nativeWindow().Razorpay(this.options);
   this.rzp1.open()

 
}

out(paymentmode:any){
console.log(paymentmode)
}

updatePaymentDetails(){

console.log('working payment Upate')
 
    var body = {
     "_id":this.viewbidDocId,
     "paymentId":this.paymentId,
     "isPaymentCompleted":true
    
   
    }
    console.log(this.docid._id)
 console.log(body)
 
   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/paymentconfirm", {
     method: 'post',
     headers: {
       "access-Control-Allow-Origin": "*",
       "Content-Type": 'application/json'
     },
     body: JSON.stringify(body),
 
   })
     .then(response => response.json())
     .then(async result => {
       console.log(result)
   
  //window.location.href='/view-bid'
      // loading.dismiss()
 
 
     }
 
     ).catch(err =>{
       //loading.dismiss()
       console.log(err)
     })
    
  }

 
}
