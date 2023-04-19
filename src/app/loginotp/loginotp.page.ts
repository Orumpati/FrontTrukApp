import { Component, OnInit ,NgZone } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
//import 'firebase/compat/database.'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { NavController, NavParams } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
//import {OneSignal }from 'onesignal-cordova-plugin';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


var config = {
  apiKey: "AIzaSyDM4C1YRZ14Lx_8NzbDnChklv9VInrgUmw",
  authDomain: "otplogin-c4da2.firebaseapp.com",
  projectId: "otplogin-c4da2",
  storageBucket: "otplogin-c4da2.appspot.com",
  messagingSenderId: "783500853422",
  appId: "1:783500853422:web:9b813df9ba59a87c31ad3f",
  measurementId: "G-69272HMPPD"
}
@Component({
  selector: 'app-loginotp',
  templateUrl: './loginotp.page.html',
  styleUrls: ['./loginotp.page.scss'],
})
export class LoginotpPage implements OnInit {
regData:any
  phoneNumber!: number;
  reCaptchaVerifier!: any;
  regNumber:any
  num!:Number
  spin!: boolean;
  checkbox=false
  
  pattern="^((\\+91-?)|0)?[0-9]{10}$"
  UniqueDeviceID!:string;

  darkMode = false;
  number: any;

  toggleDarkMode() {
    console.log('hfg')
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
  
  constructor(private router: Router, public navController : NavController,
    private uniqueDeviceID: UniqueDeviceID,
  //private OneSignal:OneSignal,
    private androidPermissions: AndroidPermissions,
    
     private ngZone: NgZone,public loadingCtrl:LoadingController,public toastCtrl:ToastController,private alert:AlertController) {

      
     }


  ngOnInit() {
    firebase.initializeApp(config);
this.number =localStorage.getItem('Number')


  }

  	
  
  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        this.UniqueDeviceID = uuid;

        alert(this.UniqueDeviceID)
      })
      .catch((error: any) => {
        console.log(error);
        this.UniqueDeviceID = "Error! ${error}";
      });
  }

route(){
  window.location.href='/selecttype'
  this.navController.navigateForward('/selecttype');

}


  getPermission(){
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if(res.hasPermission){
        
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          alert("Persmission Granted Please Restart App!");
        }).catch(error => {
          alert("Error! "+error);
        });
      }
    }).catch(error => {
      alert("Error! "+error);
    });
  }
  


  async presentToast(message: any,color: any){
    const toast = await this.toastCtrl.create({
      message:message,
      color:color,
      duration:1000,
      position:"middle"
    });
    toast.present()
  }

//get all register data send otp with verification of old user
  async getOTP(){
  const loading = await this.loadingCtrl.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var data ={
    mobileNo:this.phoneNumber
  }

    fetch("https://amused-crow-cowboy-hat.cyclic.app/login/loginDetails", {
    method:'post',
    headers:{
              "Access-Control-Allow-Origin": "*",
              "Content-Type":'application/json'
            },
            body:JSON.stringify(data)
    }).then(res => res.json())
    
    .then(
       async result =>{
        console.log(result)
    
    /*this.regData=result.data
 
    console.log(this.regData)
console.log(this.phoneNumber)
 this.regNumber = this.regData.find((t: { mobileNo: any; })=>t.mobileNo == this.phoneNumber);
console.log(this.regNumber)*/

if(result.mobileNo === this.phoneNumber){

  this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'sign-in-button',
    {
      size: 'invisible',
    }
  );
  console.log(this.reCaptchaVerifier);

  console.log(this.phoneNumber);
  firebase
    .auth()
    .signInWithPhoneNumber( '+91' + this.phoneNumber, this.reCaptchaVerifier)
    .then((confirmationResult:any) => {
      localStorage.setItem(
        'verificationId',
        JSON.stringify(confirmationResult.verificationId)
      );
      localStorage.setItem(
        'mobileNo',
        JSON.stringify(this.phoneNumber)
      );
      localStorage.setItem('logindata',JSON.stringify(result))
      loading.dismiss();
        this.ngZone.run(() => {
          this.router.navigate(['/verifyotp']);
        });
      
    
    })
    .catch((error:any) => {
      loading.dismiss()
      console.log(error.message);
      alert(error.message);
   
    });

}else{
  loading.dismiss()
    //this.loadingCtrl.dismiss();
    const alert = await  this.alert.create({
      header: 'Alert',
      subHeader: 'Your Number is Not Registered',
      message: 'Please Follow these steps',
      buttons: ['OK'],
    });

    await alert.present();
  
      //this.presentToast("Not Registered","danger");
      this.router.navigate(['/selecttype'])
     // window.location.href="/selecttype"
  
}
      }).catch(async error =>{
        loading.dismiss()
         // this.loadingCtrl.dismiss();
        
         const alert = await this.alert.create({
          header: 'Alert',
          subHeader: 'Your Number is Not Registered',
          message: 'Please Follow these steps',
          buttons: ['OK'],
          
        });
       
        await alert.present();
       this.router.navigate(['/selecttype']) 
 
      
         console.log(error)
        });
}
gototype(){
  //window.location.href="/selecttyp"
  this.router.navigateByUrl('/get-started')
}

}

