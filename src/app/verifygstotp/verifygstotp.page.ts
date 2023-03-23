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
    console.log(gstinNumber)
      const final ={
        gstin: gstinNumber,
        username: userName,
        //otp: otp,
        //appKey: appKey
      
      }
      fetch("https://api.emptra.com/gstToken", {
          
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json',
                  "clientId":'64a016ef16ec8af749ea1557511f2959:955f7766e856dadf90b8153ad2d4f9bd',
                  "secretKey":'dzODZYAgEyOPKAOAABNr2Aooc53xMYOK0EQJKabEVPJiscEceE88hXYnpQWpiIHPz'
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
