import { Component } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';

import {  OnInit, NgZone } from '@angular/core';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import  firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.page.html',
  styleUrls: ['./verifyotp.page.scss'],
})
export class VerifyotpPage implements OnInit {

 otp!:string
  verify:any
  
  mobileNo:any
  spin!:boolean
  verified:any
  UniqueDeviceID!:string;
    constructor(public loadingCtrl:LoadingController ,public toastCtrl:ToastController,private router: Router, private ngZone: NgZone,private uniqueDeviceID: UniqueDeviceID,) {}
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
  
    ngOnInit(){
      this.getUniqueDeviceID()
      
      this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
      this.mobileNo = JSON.parse(localStorage.getItem('mobileNo') || '{}');
      console.log(this.verify);
  //this.setfocus()
 this.verified=JSON.parse(localStorage.getItem('regdata') || '{}')
 console.log(this.verified)
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
    /*setfocus(){
      for(let i=1; i<=6; i++){
        if((this.otp.length + 1) == i){
         // document.getElementById("ip" + i).style.background = "var(--ion-color-dark)"
        }else{
         // document.getElementById("ip" + i).style.background = "var(--ion-color-light)"
        }
      }
    }*/
  
    /*clear(){
      this.otp=''
      this.setfocus()
    }
    back(){
  this.otp = this.otp.slice(0,-1);
  this.setfocus()
    }
    set(number:any){
      this.otp += number;
      this.setfocus();
  
      if(this.otp.length ==6){
        this.presentLoading();
        this.checkOTP()
      }
    }*/
  
    async presentLoading(){
      const loading = await this.loadingCtrl.create({
        message:'Verify OTP..',
        spinner:"circular"
      })
      await loading.present()
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
  
  
    /*checkOTP(){
      setTimeout(() =>{
        this.loadingCtrl.dismiss();
    
  
        var credential = firebase.auth.PhoneAuthProvider.credential(
          this.verify,
          this.otp 
         
        );
    
        console.log(credential);
        firebase.auth().signInWithCredential(credential)
          .then((response) => {
         
            console.log(response);
            localStorage.setItem('user_data', JSON.stringify(response));
            this.ngZone.run(() => {
              this.router.navigate(['/tab1']);
            });
          
          })
          
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
  
  
  
  
  
     
      },2000)
    }*/
  
  
   /* if(this.otp ==this.verify){
      this.presentToast("OTP Verified","success");
    }else{
      this.presentToast("Invalid OTP","danger");
    }*/
  
  
  
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
if(this.verified.role === "Shipper"){
loading.dismiss()
  this.ngZone.run(() => {
    alert('Login as Shipper')
    this.router.navigate(['/tab/tab1'])
    localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
  });

}else if(this.verified.role === "Agent/Broker"){
  loading.dismiss()
alert('Login as agent/broker')
this.router.navigate(['/tab/shipperhome'])
localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
}else if(this.verified.role === "Transporter"){
  loading.dismiss()
  alert('Login as transporter')
  this.router.navigate(['/tab/shipperhome'])
  localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
}else if(this.verified.role === 'Fleet Owner'){
  loading.dismiss()
  alert('Login as Fleet Owner')
  this.router.navigate(['/tab/shipperhome'])
  localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
}
     
this.updatedeviceid()
        })
        .catch((error) => {
          loading.dismiss()
          console.log(error);
    localStorage.removeItem('regdata')
            alert(error.message);
          });
    }


    updatedeviceid(){
      var body ={
        uniqueDeviceId:this.UniqueDeviceID
      }
      fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/updatedeviceid/" + this.verified.Authentication, {
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
          
          
    
    
        }
    
        ).catch(err =>
          console.log(err))
    }

}
