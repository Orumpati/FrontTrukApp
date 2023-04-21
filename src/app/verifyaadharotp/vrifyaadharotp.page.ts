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
  sai: any;
  docId: any;
  constructor(private router:Router,public loadingController: LoadingController) { }

  ngOnInit() {
    this.logindata=  JSON.parse(localStorage.getItem('regdata')|| '{}')
    console.log(this.logindata)
    console.log(this.logindata['aadharVerify'])
    var clientid = JSON.parse(localStorage.getItem("client_id") || '{}')
    console.log(clientid)
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
    var clientid = JSON.parse(localStorage.getItem("client_id") || '{}')
    console.log(clientid)
      const final ={
        client_id: clientid,
        otp:this.otp

      
      }
      // fetch("https://api.emptra.com/aadhaarVerification/submitOtp", {
        fetch(" https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-v2/submit-otp", {
       
          
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json',
                  'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MTkwNTkwNCwianRpIjoiZGI2YzJjYTYtY2JhMC00ZTg2LThhNzAtZjBiY2UwOGM0NmFlIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnJhb25laW5mb3RlY2hAc3VyZXBhc3MuaW8iLCJuYmYiOjE2ODE5MDU5MDQsImV4cCI6MTk5NzI2NTkwNCwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbIndhbGxldCJdfX0.Lzr1HfRgBKmRvfiwCQYC_OxUoHP7S-R5dfRKTCo5Ags"
                  // "clientId":'773901a84fd7da63fb77100ad2cefcf9:c5ba2d212af3d978c2a857062001a431',
                  // "secretKey":'FEwoB08LfXN7ie8m5y1JgQL8TSj0bO6adngxGoa5Yfc4XeXd9Pe3I2VEfGh7ZAap9'
              },
      body:JSON.stringify(final),
      }).then(res => res.json())
      
      .then(
        result =>{
     console.log(result)
        if(result.success == true){
          loading.dismiss()
          alert('OTP verified')
          this.aadharverifystatus()
          loading.dismiss()
        }else if(result.data == null){
          loading.dismiss()
              alert('Details not captured correctly')
              
        }else if(result.code == 103){
        

          loading.dismiss()
          alert('OTP is required')
         // this.router.navigate(['profile'])
        }else{
          loading.dismiss()
          alert("Recharge Your Wallet")
        }
        
      
        }
        ).catch(
            error =>{
              //alert('Enter valid OTP');
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
      fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/putprofile/" +this.logindata.Authentication, {
        
      method:'put',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      body:JSON.stringify(data),
      }).then(res => res.json())
      
      .then(
        result =>{
     console.log(result)

         this.logindata['aadharVerify']='Verified'
        

         localStorage.setItem('regdata',JSON.stringify(this.logindata))
         this.getdetailsofreffere()
        loading.dismiss()
        window.location.href='/profile'
        
      
        }
        ).catch(
            error =>{
              loading.dismiss()
             // alert('unable to add routes');
             console.log(error)
            });
       
    
    }

getdetailsofreffere(){
  
  var ss={
    referalCode:this.logindata.signupReferalCode
  }
  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/refferedBy", {
      
  method:'post',
  headers:{
            "Access-Control-Allow-Origin": "*",
              "Content-Type":'application/json'
          },
  body:JSON.stringify(ss),
  }).then(res => res.json())
  
  .then(
    async result =>{
console.log(result)
this.sai =result.ref
this.docId=result._id 
this.referedusersigned()
    })
}



    referedusersigned(){
      var data ={
        _id:this.docId,
        firstName:this.logindata.firstName,
        lastName:this.logindata.lastName,
        mobileNo:this.logindata.mobileNo
      }
      fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/refereduserdata", {
          
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      body:JSON.stringify(data),
      }).then(res => res.json())
      
      .then(
        result =>{
    console.log(result)
      
        }
        ).catch(
            error =>{
          
             console.log(error)
             
            });
    }
    
    
    
    
    
    
    addcoinstoRefered(){
      var data ={
        referalCode:this.logindata.signupReferalCode
      
      }
      fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/addcoinstoRefered", {
          
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      body:JSON.stringify(data),
      }).then(res => res.json())
      
      .then(
        result =>{
          this.addcoinstorefer()
    console.log(result)
      
        }
        ).catch(
            error =>{
          
             console.log(error)
             
            });
    }



      
    addcoinstorefer(){
      var data ={
        referalCode:this.logindata.referalCode
      
      }
      fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/addcoinstoRefered", {
          
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      body:JSON.stringify(data),
      }).then(res => res.json())
      
      .then(
        result =>{
    console.log(result)
      
        }
        ).catch(
            error =>{
          
             console.log(error)
             
            });
    }

    route(){
      this.router.navigate(['profile'])
      window.location.href='/profile'
    }
}
