import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {   NgZone } from '@angular/core';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import  firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-end-otp',
  templateUrl: './end-otp.page.html',
  styleUrls: ['./end-otp.page.scss'],
})
export class EndOtpPage implements OnInit {

  otp!:string
  verify:any
  reCaptchaVerifier!: any;
  mobileNo: any;
  constructor(private loadingCtrl:LoadingController,private ngZone:NgZone,private router:Router) { }
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '45px',
      height: '45px',
    },
  };
  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    this.mobileNo = JSON.parse(localStorage.getItem('Number') || '{}');
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  async handleClick() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
loading.dismiss()
this.ngZone.run(() => {
  alert('OTP verified')
  
  this.router.navigate(['/proofofdelivery'])

});


   

      })
      .catch((error) => {
        loading.dismiss()
        console.log(error);
  localStorage.removeItem('regdata')
          alert(error.message);
        });
  }


}
