import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-vrifyaadharotp',
  templateUrl: './vrifyaadharotp.page.html',
  styleUrls: ['./vrifyaadharotp.page.scss'],
})
export class VrifyaadharotpPage implements OnInit {
otp:any;
logindata:any

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
  constructor(private router:Router,public loadingController: LoadingController) { }

  ngOnInit() {
    this.logindata=  JSON.parse(localStorage.getItem('regdata')|| '{}')
    console.log(this.logindata)
  }
  onOtpChange(otp: string) {
    this.otp = otp;
  }

  
  async handleClick(){
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    var clientid = localStorage.getItem("client_id")
    console.log(clientid)
      const final ={
        client_id: clientid,
        otp:this.otp
      
      }
      fetch("https://api.emptra.com/aadhaarVerification/submitOtp", {
          
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
        if(result.code == 103){
          loading.dismiss()
          alert('OTP is required')
        }else if(result.result.data == null){
          loading.dismiss()
              alert('Enter valid OTP')
        }else{
          loading.dismiss()
          alert('OTP verified')
          this.aadharverifystatus()
         // this.router.navigate(['profile'])
        }
        
      
        }
        ).catch(
            error =>{
              alert('Enter valid OTP');
             console.log(error)
            });
          
    
    }


    async aadharverifystatus(){
      const loading = await this.loadingController.create({
        message: 'Verifying...',
        spinner: 'crescent'
      });
      await loading.present();
      var data ={
        aadharVerify:'Verified'
      
      }
      console.log(data)
      fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/putprofile/" +this.logindata._id, {
        
      method:'put',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      body:JSON.stringify(data),
      }).then(res => res.json())
      
      .then(
        result =>{
     console.log(result.routes)
        loading.dismiss()
        
        
      
        }
        ).catch(
            error =>{
              loading.dismiss()
              alert('unable to add routes');
             console.log(error)
            });
       
    
    }
}
