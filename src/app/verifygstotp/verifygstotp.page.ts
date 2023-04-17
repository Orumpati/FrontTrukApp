import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-verifygstotp',
  templateUrl: './verifygstotp.page.html',
  styleUrls: ['./verifygstotp.page.scss'],
})
export class VerifygstotpPage implements OnInit {
otp:any
  constructor(private router:Router,public loadingController: LoadingController) { }

  ngOnInit() {
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

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  async otpfromgst(){
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    var gstinNumber = localStorage.getItem("gst")
    var userName = localStorage.getItem("gstusername")
    var appkey = localStorage.getItem("AppKey")
    console.log(gstinNumber)
      const final ={
        gstin: gstinNumber,
        username: userName,
        otp: this.otp,
        appKey:appkey
      
      }
      fetch("https://api.emptra.com/gstToken", {
          
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json',
                  "clientId":'773901a84fd7da63fb77100ad2cefcf9:c5ba2d212af3d978c2a857062001a431',
                  "secretKey":'FEwoB08LfXN7ie8m5y1JgQL8TSj0bO6adngxGoa5Yfc4XeXd9Pe3I2VEfGh7ZAap9'
              },
      body:JSON.stringify(final),
      }).then(res => res.json())
      
      .then(
        result =>{
     console.log(result)
        if(result.code === 103){
          loading.dismiss()
          alert('OTP is required')
        }else if(result.result.data === null){
          loading.dismiss()
              alert('Enter valid OTP')
        }else{
          loading.dismiss()
          alert('OTP verified')
          this.router.navigate(['profile'])
        }
        
      
        }
        ).catch(
            error =>{
              loading.dismiss()
              alert('Enter valid OTP');
             console.log(error)
            });
          
    
    }


}
