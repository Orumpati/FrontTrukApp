import { Component } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {  OnInit, NgZone } from '@angular/core';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import  firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
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
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.page.html',
  styleUrls: ['./verifyotp.page.scss'],
})
export class VerifyotpPage implements OnInit {

 otp!:string
  verify:any
  reCaptchaVerifier!: any;
  mobileNo:any
  spin!:boolean
  verified:any
  UniqueDeviceID!:string;
  timer: any;
    constructor(public loadingCtrl:LoadingController ,public toastCtrl:ToastController,private router: Router, private ngZone: NgZone,private uniqueDeviceID: UniqueDeviceID,private alert:AlertController) {}
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
 this.verified=JSON.parse(localStorage.getItem('logindata') || '{}')
 console.log(this.verified)
    }
  

    getUniqueDeviceID() {
      this.uniqueDeviceID.get()
        .then((uuid: any) => {
          console.log(uuid);
          this.UniqueDeviceID = uuid;
  
          //alert(this.UniqueDeviceID)
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
  localStorage.setItem('regdata',JSON.stringify(this.verified))
loading.dismiss()
  this.ngZone.run(() => {
    alert('Login as Shipper')
    this.updatedeviceid()
    this.router.navigate(['/tab/tab1'])
    localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
    localStorage.removeItem('lookingfor')
  });

}else if(this.verified.role === "Agent/Broker"){
  localStorage.setItem('regdata',JSON.stringify(this.verified))
  localStorage.setItem('lookingfor',JSON.stringify('loads'))
  loading.dismiss()
alert('Login as agent/broker')
this.updatedeviceid()
this.router.navigate(['/tab/shipperhome'])
localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
}else if(this.verified.role === "Transporter"){
  localStorage.setItem('regdata',JSON.stringify(this.verified))
  localStorage.setItem('lookingfor',JSON.stringify('loads'))
  loading.dismiss()
  alert('Login as transporter')
  this.updatedeviceid()
  this.router.navigate(['/tab/shipperhome'])
  localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
}else if(this.verified.role === 'Fleet Owner'){
  localStorage.setItem('regdata',JSON.stringify(this.verified))
  localStorage.setItem('lookingfor',JSON.stringify('loads'))
  loading.dismiss()
  alert('Login as Fleet Owner')
  this.updatedeviceid()
  this.router.navigate(['/tab/shipperhome'])
  localStorage.setItem('loginrole',JSON.stringify(this.verified.role))
}else if(this.verified.userRole === 'Driver'){
  localStorage.setItem('regdata',JSON.stringify(this.verified))
 // localStorage.setItem('lookingfor',JSON.stringify('loads'))
 localStorage.removeItem('lookingfor')
  loading.dismiss()
  alert('Login as Driver')
  this.updatedeviceid()
  this.router.navigate(['/tab/driver-active-loads'])
  localStorage.setItem('loginrole',JSON.stringify(this.verified.userRole))
}
     

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

    async getOTP(){
      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
      var data ={
        mobileNo:this.mobileNo
      }
      //fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/getRegisterData", {
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
    
    if(result.mobileNo === this.mobileNo){
    
      this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
        }
      );
      console.log(this.reCaptchaVerifier);
    
      console.log(this.mobileNo);
      firebase
        .auth()
        .signInWithPhoneNumber( '+91' + this.mobileNo, this.reCaptchaVerifier)
        .then((confirmationResult:any) => {
          localStorage.setItem(
            'verificationId',
            JSON.stringify(confirmationResult.verificationId)
          );
          localStorage.setItem(
            'mobileNo',
            JSON.stringify(this.mobileNo)
          );
          localStorage.setItem('regdata',JSON.stringify(result))
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
            // window.location.href="/selecttype"
                  
                
           /*setTimeout(() => {
            this.spin=false
            this.ngZone.run(() => {
              this.router.navigate(['/selecttype']);
            });
          }, 2000);*/
            
           
          
             console.log(error)
            });
    }

    resendOTP() {
      // Call your OTP sending function here
      this.getOTP();
      
      // Set a timer for 60 seconds
    this.timer = 60;
      let interval = setInterval(() => {
        this.timer--;
        if (this.timer == 0) {
          clearInterval(interval);
        }
      }, 1000);
    }

}
