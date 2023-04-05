import { Component, OnInit } from '@angular/core';
import {   NgZone } from '@angular/core';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import  firebase from 'firebase/compat/app';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-load-otp',
  templateUrl: './load-otp.page.html',
  styleUrls: ['./load-otp.page.scss'],
})
export class LoadOtpPage implements OnInit {
  otp!:string
  verify:any
  reCaptchaVerifier!: any;
  Number: any;
  constructor(public loadingCtrl:LoadingController ,public toastCtrl:ToastController,private router: Router,private ngZone: NgZone) { }
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
    this.Number = JSON.parse(localStorage.getItem('Number') || '{}')
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
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
alert('Verified')
  this.router.navigate(['/load-tracking'])
  
  
});


   

      })
      .catch((error) => {
        loading.dismiss()
        console.log(error);
  
          alert(error.message);
        });
  }



}
