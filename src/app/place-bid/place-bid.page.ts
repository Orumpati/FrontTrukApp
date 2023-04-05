import { Component, OnInit,ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { IonContent, LoadingController,NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.page.html',
  styleUrls: ['./place-bid.page.scss'],
})
export class PlaceBidPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal ;
  private refresh = new Subject<void>();
  item: any = []; 
  bids:any=[];
  show:boolean | undefined;
  hide:boolean | undefined
  _id: any;
id:any
  OriginLocation:any;
  DestinationLocation: any;
  data: any;
  vehicle: any;
  product: any;
  Quantity: any;
  objects: any;
  bidPrice:any;
  finalss:any;
  placebidID:any
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  newMsg: any;
  created!: number;
  date: any

  currentUserType="Transporter";
  

  
  bidDetails: any;
  NegoPrice: any;
  num: any;
  insidebidarray: any;
  final: any;
  finalaccepted: any;
  insidebids: any;
  insidearray: any;
  insideBidactivity: any;
  finalresult: any;
  finalobjectprice: any;
  gettenprice: any;
  finalAcceptforBid: any;
  regdata: any;
  ispaymentcomplete: any;
  isShipperAccepted: any;
  typeofpay: any;
  sharecontact: any;
  driverdetails: any;
  driver: any;
  isagentAccept: any;
  agentInitialBidSend: any;
  paymentId: any;
  isPaymentCompleted: any;
  TohideNegoshit: any;
  bidslength: any;
  
  constructor(private router:Router,public loadingController: LoadingController,public navController:NavController,
    private location:Location) { }

  @ViewChild(IonContent)
  content!: IonContent;

  ngOnInit():void{
   this.placebidID= this.location.getState()
      
   console.log(this.placebidID.profile)
    this.regdata =JSON.parse(localStorage.getItem('regdata') || '{}')
console.log(this.regdata)
    this.date = new Date().getTime()
    
   this.objects = JSON.parse(localStorage.getItem("loadBy") || '{}');
   console.log(this.objects)
   this.typeofpay = this.objects.typeOfPay
this.getfullarray()
  
this.autorefreshdata.subscribe(res =>{
  this.getfullarray()
})

 fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteByid/" +this.objects._id, {
   method: 'get',
   headers: {
     "access-Control-Allow-Origin": "*",
     "Content-Type": 'application/json'
   },
  // body:JSON.stringify(query)
 })
   .then(response => response.json())
   .then(result => {
     console.log(result) 
  
   
 

  

   }

   ).catch(err =>
     console.log(err))

  }

  get autorefreshdata(){
    return this.refresh
      }
ionViewDidEnter(){
  this.getfullarray()
}
  getfullarray(){

    var query ={
     "_id": this.objects._id,
      "mobileNo":this.regdata.mobileNo//8762345675 //this.regdata.mobileNo
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/showAgentSideBidConversation", {
      method: 'POST',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body:JSON.stringify(query)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result) 
     
      this.bidslength =result.bids.length
       
        //getting full array
        if(result.bids.length === 0){
          this.show=true
          this.hide=false
          
        }
       
        for(let i=0; i<result.bids.length;i++){
      this.final= result.bids[i]
      this.sharecontact = result.bids[i].shareContact
      this.isPaymentCompleted =result.bids[i].isPaymentCompleted
      this.TohideNegoshit = result.bids[i].TohideNegoshit
      this.paymentId =result.bids[i].paymentId
      this.insidebidarray= result.bids[i].initialAccept
      this.driverdetails =result.bids[i].vehicleInformation[i] 
      console.log(this.sharecontact) //inside an array
        }
        console.log(this.driverdetails)
          this.item = this.final.quoteBid //go inside bids array
            this.agentInitialBidSend =this.item.agentInitialBidSend
            this. isShipperAccepted =this.item.isShipperAccepted
          console.log(this.item)
         console.log(this.agentInitialBidSend)
          for(let i=0; i<this.item.BidActivity.length;i++){ //
            this.gettenprice =this.item.BidActivity[i]
            console.log(this.gettenprice)


            this.finalss= this.item.BidActivity
            console.log(this.finalss)
            this.num =this.item.BidActivity[i].userNo
              }
             // this.ispaymentcomplete = this.item.isPaymentCompleted
             

             // this. initialAccept =this.item.in
              this.isagentAccept =this.item.isAgentAccepted
        console.log(this.finalss.length)
    
        if(this.finalss.length > 0){
          this.hide=true
          this.show= false
        }

     

      }

      ).catch(err =>
        console.log(err))
  }
  




 //send mes
 /* sendMessage() {
  this.BidActivity.push({
    price: 12,
    userNo: 123456,
    time: this.date,
    userType:"Shipper"
  });
  this.newMsg = '';
  setTimeout(() => {
    this.content.scrollToBottom(200);
  })
} */

  async acceptBid(){

   if(this.regdata.aadharVerify == 'notVerified'){
      alert("Verify Aadhar to Accept")
window.location.href='/profile'
    }else{

    
    //confirm("Are You Sure,To Accept")*/
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var body = {

  
    "_id": this.objects._id,
    "mobileNo":this.regdata.mobileNo, //trucker
    "userType":this.regdata.role,
    "Bidprice":this.objects.expectedPrice,
    "initialAccept" :"Accepted",
    "TohideAcceptBtn":true,
    "Number":parseInt(this.objects.Number),//for notification who posted the load(Shipper)
    "Name":this.regdata.firstName+this.regdata.lastName,//for notification
    "mess":"Accepted your Bid for amount"
   }
console.log(body)
  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/placeBid", {
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
      
      loading.dismiss()
      window.location.reload()

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)})
  }
}

  async initialBid(){
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  console.log("working")
  console.log(this.newMsg)
  var body = {

  
    "_id":this.objects._id,
    "mobileNo": this.regdata.mobileNo,
    "userType":this.regdata.role,
    "Bidprice":this.newMsg,
    "Number":parseInt(this.objects.Number), //for notification
    "Name":this.regdata.firstName+this.regdata.lastName, //for notification
    "agentInitialBidSend":true,
    "TohideAcceptBtn":true,
    
    "mess":"placed a Bid To Your Load ,Price:" 
  
   }

  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/placeBid", {
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
     // this.saveDetails()
      loading.dismiss()
      window.location.reload()

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)})

}
 saveDetails(){
var data ={
  "TohideNegoshit":true
}
  
  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/updateNego/" +this.objects._id, {
    
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

    
  
    
  
    }
    ).catch(
        error =>{
          
          //alert('unable update Data');
         console.log(error)
        });
      

}

  async negotiate(){
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var body = {

  
    "_id": this.objects._id,
    "mobileNo":this.regdata.mobileNo,
    "userNo":this.regdata.mobileNo,
    "userType":this.regdata.role,
    "price":this.NegoPrice,
    "TohideAcceptBtn":true,
    "Number":parseInt(this.objects.Number),//for notification
    "Name":this.regdata.firstName+this.regdata.lastName, //for notification
    "mess":"placed a Bid To Your Load ,Price:" //for notification
  
   }

  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/updateBids", {
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
      
      loading.dismiss()
  window.location.reload()

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)})

}
  async acceptBidForFinal(){
    if(this.regdata.aadharVerify == 'notVerified' ){
      alert("Verify Aadhar to Accept")
window.location.href='/profile'
    }else{
    
     // confirm("Are you Sure To Accept")*/
    
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  //this.getfullarray()
  
  var body = {
  
    
    "_id":this.objects._id,
    "mobileNo":this.regdata.mobileNo,
    "isAgentAccepted":true,
    "TohideAcceptBtn":true,
    "Number":parseInt(this.objects.Number), // for send notifi
    "Name":this.regdata.firstName + this.regdata.lastName, // for send notifi
    "Bidprice":this.item.tentativefinalPrice, // for send notifi
    "mess":"Accepted a bid for"
  
   }
   console.log(body)
console.log(this.item.mobileNo)

  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/finalacceptbyagent", {
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
      loading.dismiss()
      

window.location.reload()
    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)})
  }
}
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
routeto(){
window.location.href="/tab/tab2"
this.router.navigate(['/tab/tab2'])
}

posttruck(){
  this.router.navigate(['add-new-truck-details'])
  localStorage.setItem("loadItem",JSON.stringify(this.objects._id))
  window.location.href="/add-new-truck-details"
  
}
ContactOnline(){
  this.router.navigate(['drivers'])
  localStorage.setItem("loadItemOnline",JSON.stringify(this.objects._id))
  localStorage.setItem("locatioPath",JSON.stringify("placebids"))
  window.location.href="/drivers"
}

cancel() {
  //this.modal.dismiss(null, 'cancel');
  window.location.href='/place-bid'
}



onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    this.message = `Hello, ${ev.detail.data}!`;
  }
}
}
