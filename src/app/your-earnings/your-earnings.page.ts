import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(public alertController:AlertController,private loadingController:LoadingController,private router:Router) { }

  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata') || '{}')
    //this.referals = this.logindata.referTo
   // this.referlen=this.referals.length
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

  if(Number(this.inputpoints) > Number(this.Totalcoins)){
    alert("Don't have Sufficient Coins to withdraw")
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

  fetch("https://amused-crow-cowboy-hat.cyclic.app/point/pointsPost", {
    method: 'post',
    headers: {
      "access-Control-Allow-Origin": "*",
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
      text:`UserName:${this.logindata.firstName + this.logindata.lastName},
           MobileNo: ${this.logindata.mobileNo} ,
           RequestedPoints:${this.inputpoints}`  
  }
  console.log(data)

  fetch("https://amused-crow-cowboy-hat.cyclic.app/point/emailPoints", {
    method: 'post',
    headers: {
      "access-Control-Allow-Origin": "*",
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

  fetch("https://amused-crow-cowboy-hat.cyclic.app/point/reqestedHistory", {
    method: 'post',
    headers: {
      "access-Control-Allow-Origin": "*",
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


  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/getprofiledetails/"+this.logindata.Authentication, {
    method: 'get',
    headers: {
      "access-Control-Allow-Origin": "*",
  
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
 

  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/addAccDetails", {
    method: 'post',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),
     
        
        loading.dismiss()
        
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
  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/withdrawCoins", {
      
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
/*updateCoins(withdrawcoins:any){
  var data ={
    TotalCoins:this.totslcoinDB - withdrawcoins
  }
  
  fetch("http://localhost:3000/TruckAppUsers/updateCoins/" + this.logindata.Authentication, {
    method: 'put',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
     
        

    }

    ).catch(err =>{
      
      console.log(err)
     
    })
}*/


/*updateminusCoins(coins:any){
  var data ={
    TotalCoins:coins
  }
  fetch("http://localhost:3000/TruckAppUsers/updateCoins/" + this.logindata.Authentication, {
    method: 'put',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
     
        

    }

    ).catch(err =>{
      
      console.log(err)
     
    })
}*/
}
