import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertController ,LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-your-earnings',
  templateUrl: './your-earnings.page.html',
  styleUrls: ['./your-earnings.page.scss'],
})
export class YourEarningsPage implements OnInit {
  data:any=[];
  dat=false;
  data1=false;
  addon:any
  logindata: any;
  referals: any;
  referlen!: number ;
  Items: any;
  inputpoints:any
  accountNum: any;
  ifscCode: any;
  accHolderName: any;
  upiId: any;
  acc: any;
  totslcoinDB: any;
  Totalcoins: any;
  PermanetCoins: any;
  OrderTime: any;
  currenttime: any;
  AccDetails: any;
  constructor(public alertController:AlertController,private loadingController:LoadingController,private router:Router,private datepipe:DatePipe) { }

  ngOnInit() {
    this.OrderTime =this.datepipe.transform((new Date), 'MM/dd/yyyy ');
    this.currenttime =this.datepipe.transform((new Date), ' h:mm:ss');
    this.logindata = JSON.parse(localStorage.getItem('regdata') || '{}')
 this.AccDetails =JSON.parse(localStorage.getItem('AccDetails')||'{}')
   console.log(this.logindata.signupReferalCode )
    this.referal()
//     if( this.logindata.signupReferalCode == undefined ||this.logindata.signupReferalCode ==null || this.logindata.signupReferalCode ==''){
//     this.addon=0
  
//   }else if(this.logindata.signupReferalCode !=null ||this.logindata.signupReferalCode !=''){
  
// this.addon=100
//   }
  this.toggle()

 
}
toggle(){
  
this.dat=true;
this.data1=false;
}
toggle1(){
  this.dat=false;
  this.data1=true;
}
async presentAlertPrompt() {
  const alert = await this.alertController.create({
   
    inputs: [
      {
        name: 'name',
        type: 'text' ,
        placeholder: 'Enter withdraw points '
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: data => {
          console.log('Saved clicked', data.name);
          this.presentSecondAlert()

        }
      }
    ]
  });

  await alert.present();
}

async presentSecondAlert() {
  const alert = await this.alertController.create({
    //header: 'Second Alert',
    message: 'Successfull',
    buttons: ['OK']
  });

  await alert.present();
}


 async NewPostAdd() {

  if(Number(this.inputpoints) > Number(this.Totalcoins) ){
    alert("Don't have Sufficient Coins to withdraw")
  }else if(Number(this.PermanetCoins) > 1000){
    alert("You reached your maximum limit of withdrawal")
  }else{
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  
  var data = {
    
    userName:this.logindata.firstName + this.logindata.lastName,
    userNumber:this.logindata.mobileNo,
    requestedPoints:this.inputpoints,
    
   


  }
  console.log(data)
  //localStorage.setItem("newpostAdd", JSON.stringify(data));

  fetch("https://trukapp2023.herokuapp.com/point/pointsPost", {
    method: 'post',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),
        this.Items = result  
      
       this.withdrawCoins()
        loading.dismiss()
        this.email()
      alert("Request sent Successfully")
window.location.reload()
    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
     
    })
  
    
  }
}

email() {

  var data = {
      // text:`UserName:${this.logindata.firstName + this.logindata.lastName},
      //      MobileNo: ${this.logindata.mobileNo} ,
      //      RequestedPoints:${this.inputpoints}`  
      text:` Hello,
      A withdrawal request for referral coins has been made. Please take action immediately
      Withdrawal Information:-
      User Name:${this.logindata.firstName + this.logindata.lastName}
      Registered Mobile No: ${this.logindata.mobileNo}
      Company Name: ${this.logindata.companyName}
      Location: ${this.logindata.city}
      Requested Amount: ${this.inputpoints}
      Requested Date: ${this.OrderTime +this.currenttime}
      Account Number: ${this.AccDetails.accountNum}
      IFSC Code: ${this.AccDetails.ifscCode}
      UPI ID: ${this.AccDetails.upiId}

     Regards,
     TrukApp Referrals
      `
  }
  console.log(data)

  fetch("https://trukapp2023.herokuapp.com/point/emailPoints", {
    method: 'post',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
        
        
    }

    ).catch(err =>
      console.log(err))
}

  async deepu() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var data = {
    userNumber:this.logindata.mobileNo,

  }
  console.log(data)
  //localStorage.setItem("newpostAdd", JSON.stringify(data));

  fetch("https://trukapp2023.herokuapp.com/point/reqestedHistory", {
    method: 'post',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),
        this.Items = result.data 
        
      loading.dismiss()
    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
     
    })
}



referal() {


  fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/getprofiledetails/"+this.logindata.Authentication, {
    method: 'get',
    headers: {
      "Access-Control-Allow-Origin": "*",
  
    },
    

  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      var referal = result.data 
      this.referlen=result.doclen

      for(let i=0;i<referal.length;i++){
        this.Totalcoins=referal[i].TotalCoins
        this.PermanetCoins=referal[i].PermanetCoins
        this.referals=referal[i].refferedTo
        this.acc=referal[i].accDetails.length
      }
    
        console.log(this.Totalcoins)
  
    }

    ).catch(err =>{
  
      console.log(err)
     
    })
}


async addAccUPID() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  
  var data = {
    _id:this.logindata.Authentication,
    accountNum:this.accountNum,
    ifscCode:this.ifscCode,
    accHolderName:this.accHolderName,
    upiId:this.upiId
    
   


  }
  // let regex = new RegExp("/^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]{2, 64}$/")
  // if (regex.test(data.upiId) == true) {
    


  fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/addAccDetails", {
    method: 'post',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),
     
       
        loading.dismiss()
        localStorage.setItem('AccDetails',JSON.stringify(data))
      alert("Account details added Successfully")
window.location.reload()
    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
     
    })
  //}
  // else {
  //     alert('Enter Correct Upid')
  //     loading.dismiss()
  // }
}


async addAccDetails() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  
  var data = {
    _id:this.logindata.Authentication,
    accountNum:this.accountNum,
    ifscCode:this.ifscCode,
    accHolderName:this.accHolderName,
    upiId:this.upiId
    
   


  }

    


  fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/addAccDetails", {
    method: 'post',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),
     
        
        loading.dismiss()
        localStorage.setItem('AccDetails',JSON.stringify(data))
      alert("Account details added Successfully")
window.location.reload()
    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
     
    })
  
}


withdrawCoins(){
  var data ={
    _id:this.logindata.Authentication,
    withdrawCoins:this.inputpoints
  
  }
  fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/withdrawCoins", {
      
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


goback(){
  if(this.logindata.role == 'Shipper'){
    this.router.navigate(['tab/tab1'])
  }else{
    
    this.router.navigate(['tab/tab2'])
  }
}


autorefresh(event:any){
    
  setTimeout(() => {
    event.target.complete()
   window.location.reload()
  }, 2000);
}

}
