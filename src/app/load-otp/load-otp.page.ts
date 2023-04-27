import { Component, OnInit } from '@angular/core';
import {   NgZone } from '@angular/core';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import  firebase from 'firebase/compat/app';
import { LoadingController,ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
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
  language: any;
  constructor(public loadingCtrl:LoadingController ,public toastCtrl:ToastController,private router: Router,private ngZone: NgZone,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {

    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
   }
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
alert('Verified')
this.ngZone.run(() => {
window.location.href='/load-tracking'
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
