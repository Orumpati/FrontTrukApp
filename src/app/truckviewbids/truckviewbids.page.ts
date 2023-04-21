import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-truckviewbids',
  templateUrl: './truckviewbids.page.html',
  styleUrls: ['./truckviewbids.page.scss'],
})
export class TruckviewbidsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal ;
 // private refresh = new Subject<void>();
  item: any = [];
  bids:any=[];
  NegoPrice:any;
  currentUserType="Shipper";
    bidActivity: any;
    Number: any;
    bidActivityprice: any;
    bidact: any;
    bidnumber: any;
    initialaccepted: any;
    finalAcceptforBid: any;
    goinsidebids: any;
    goinsidetenprice: any;
    finalAgentAccept: any;
    message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
    name!: string;
  regdata: any;
  openedBid: any;
  bidactivityofopenbid: any;
  filteredbid: any;
  onlybid: any;
  conditions: any;
  agentconditions: any;
  products: any;
  tenprice: any;
  paymentdone: any;
  final: any;
  typepay: any;
  paymentid: any;
  messg: any;
  initialagentBid: any;
  sendbidno: any;
  loadDocId: any;
  show:boolean | undefined;
  hide:boolean | undefined
  tohideAccBtn: any;
  tentativefinalPrice: any;
  sharecontact: any;
  driverdetails: any;
  trukDocId: any;
  TohideNegoshit: any;
  shipperNo: any;
  
    constructor(public loadingController: LoadingController,public navControl:NavController,private router:Router) { }
  
    ngOnInit() {
      this.regdata =JSON.parse(localStorage.getItem('regdata') || '{}')
    console.log(this.regdata)
    this.loadDocId = JSON.parse(localStorage.getItem('totalloadTAll') || '{}')
      this.openedBid =JSON.parse(localStorage.getItem('openedBid') || '{}')
      this.trukDocId =JSON.parse(localStorage.getItem('loadDocId') || '{}')
     console.log(this.openedBid)
     console.log(this.trukDocId)
      console.log(parseInt(this.loadDocId.Number))
       this.typepay = this.openedBid.typeOfPay
  
      //this.bidactivityofopenbid =this.openedBid.BidActivity
     /* for(let i=0; i<this.bids.bids.length;i++){
           this.bidact=this.bids.bids[i]
      }*/

  this.all()

     
  }



  all(){
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteByid/"+ this.openedBid._id, {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
  
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
   
      
      for(let i=0; i<result.length; i++){
        this.paymentid= result[i].paymentId
        this.sharecontact =result[i].shareContact
        this.paymentdone =result[i].isPaymentCompleted
        this.TohideNegoshit = result[i].TohideNegoshit
        this.shipperNo = result[i].Number
        console.log(Number(this.shipperNo))
    var final= result[i].bids //this is bids array
    console.log(final)
    if(result[i].bids.length === 0){
      this.show=true
      this.hide=false
      
    }
    this.driverdetails =result[i].vehicleInformation[i]
      }
      
   
    console.log(this.driverdetails)
        this.item = final
        console.log(this.item)
     
        for(let i=0; i<this.item.length;i++){
          console.log(Number(this.item[i].mobileNo))
   if(this.regdata.mobileNo == this.item[i].mobileNo){

          console.log(this.item[i])
          //this.goinsidebids =this.item[i]
          //this.finalAgentAccept =this.item[i]
         
          this.tohideAccBtn =this.item[i].TohideAcceptBtn
          this.bidnumber =this.item[i].mobileNo
          
          this.conditions =this.item[i].isAgentAccepted
          this.agentconditions =this.item[i].isShipperAccepted
          
          this.initialagentBid =this.item[i].agentInitialBidSend
          this.tentativefinalPrice =this.item[i].tentativefinalPrice
console.log(this.tohideAccBtn)
          this.bidActivity= this.item[i].BidActivity //chatting array
          if(this.bidActivity.length > 0){
            this.hide=true
            this.show= false
          }
          console.log(this.bidActivity)
        
   }
            }
            console.log(this.goinsidetenprice)
           // console.log(this.finalAgentAccept.isAgentAccepted)
            //console.log(this.goinsidebids.isShipperAccepted)
      console.log(this.bidnumber)
  
      for(let i=0; i<this.bidActivity.length;i++){
        this.initialaccepted =this.bidActivity[i].initialAccept
      
        this.bidActivityprice= this.bidActivity[i].userNo
        
          }
          console.log(this.bidActivityprice)
     
    }
  
    ).catch(err =>{
  
      console.log(err)})
 
  }
    
  
    async negotiate(){
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
    
      var body = {      
        "_id":this.openedBid._id,
        "mobileNo":this.bidnumber,//this.openedBid.mobileNo, //evaritho negotiate chesthunnamo vadi mobile number
        "userNo":this.regdata.mobileNo,
        "userType":this.regdata.role,
        "price":this.NegoPrice,
        "TohideAcceptBtn":true,
        "Name":this.regdata.firstName+this.regdata.lastName,//for notifi 
        Number:this.shipperNo, //fornotifca
        "mess":"Placed a Bid for amount"
      
       }
      
  
    
      fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/updateBids", {
        method: 'post',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body),
    
      })
        .then(response => response.json())
        .then(async result => {
          console.log(result)
          this.all()
         // window.location.reload()
          loading.dismiss()
          
    
    
        }
    
        ).catch(err =>{
          loading.dismiss()
          console.log(err)
        })
    
    }
  
    async acceptBid(){
      if(this.regdata.aadharVerify == 'notVerified' ){
        alert("Verify Aadhar to Accept")
  window.location.href='/profile'
      }else{
        if(confirm("Once you accept the bid, You cant negotiate")){
     // confirm("Are You Sure, To accept")
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
      var body = {
    
      
        "_id":this.openedBid._id,
        "mobileNo":this.regdata.mobileNo,
        "userType":this.regdata.role,
        "Bidprice":this.loadDocId.expectedPrice,
        "initialAccept" :"Accepted",
        "BidStatus":"closed",
        "TohideAcceptBtn":true,
        "shipperAccept":true,//for inprogress
        "contactSharedNum":this.regdata.mobileNo,//for inprogress
        "bidAcceptedTo":this.openedBid.mobileNo,
         "Name":this.regdata.firstName+this.regdata.lastName,
         "mess":"Accepted your bid for",

         Number:this.loadDocId.Number,//for notification who posted the load(Shipper)

        
      
       }
       console.log(this.bids._id)
  console.log(body)
    
      fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/initialacceptbyshipper", {
        method: 'post',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body),
    
      })
        .then(response => response.json())
        .then(async result => {
          console.log(result)
          const data = result.message
          console.log(data)
          localStorage.setItem('viewBid',JSON.stringify(data))
          this. acceptBidStatus()
          //this.acceptBidS()
          this.navControl.navigateForward('/truckviewbids')
          loading.dismiss()
          this.all()
    
        }
    
        ).catch(err =>{
          loading.dismiss()
          console.log(err)
        })
      }
    }}



  acceptBidS(){

    var data={
      isActive:"Completed"
    }
   // console.log(data)

    
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteDeactivate/" + this.openedBid._id, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

    })
      .then(response => response.json())
      .then(result => {
        console.log(result)

        //  this.products = result  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions

        //  this.all()
        //window.location.reload()  // reloading window

      }

      ).catch(err =>
        console.log(err))
}

  
  async initialBid(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    console.log("working")
    var body = {
  
    
      "_id":this.openedBid._id,
      "mobileNo": this.regdata.mobileNo,
      "userType":this.regdata.role,
      "Bidprice":this.messg,
      Number:this.loadDocId.Number, //for notification
      "Name":this.regdata.firstName+this.regdata.lastName, //for notification
      "agentInitialBidSend":true,
      "TohideAcceptBtn":true,
     "mess":"placed a Bid To Your Load ,Price:" 
    
     }

   

  
  
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/placeBid", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),
  
    })
      .then(response => response.json())
      .then(async result => {
        console.log(result)
        
        loading.dismiss()
        this.all()
        //window.location.reload()
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)})
  
  }

  async acceptBidForFinal(){
    if(this.regdata.aadharVerify == 'notVerified' ){
      alert("Verify Aadhar to Accept")

    }else{
      if(confirm("Once you accept the bid, You cant negotiate")){
      //confirm("Are you Sure To Accept")*/
    
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  //this.getfullarray()
  
  var body = {
  
    
    "_id":this.openedBid._id,
    "mobileNo":this.regdata.mobileNo,
    "isAgentAccepted":true,
    "TohideAcceptBtn":true,
    "BidStatus":"closed",
    "shipperAccept":true,//for inprogress
    "contactSharedNum":this.regdata.mobileNo,//for inprogress
    Number:this.loadDocId.Number, // for send notifi
    "Name":this.regdata.firstName + this.regdata.lastName, // for send notifi
    "Bidprice":this.tentativefinalPrice, // for send notifi
    "mess":"Accepted a bid for"
  
   }

       

   console.log(body)
console.log(this.item.mobileNo)

  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/finalacceptbyagent", {
    method: 'post',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body),

  })
    .then(response => response.json())
    .then(async result => {
      console.log(result)
      loading.dismiss()
      this. acceptBidStatus()
     
      this.all()
//window.location.reload()
    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)})
  }}
}


  makepayment(){
    localStorage.setItem('filteredBid',JSON.stringify(this.filteredbid))
    window.location.href='/makepayment'
  }

  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }

  posttruck(){
    this.router.navigate(['add-new-trukfortrukbid'])
    localStorage.setItem("loadItem",JSON.stringify(this.openedBid._id))
    window.location.href="/add-new-trukfortrukbid"
    
  }
  ContactOnline(){
    this.router.navigate(['drivers'])
    localStorage.setItem("loadItemOnline",JSON.stringify(this.openedBid._id))
    localStorage.setItem("locatioPath",JSON.stringify("truckViewBid"))
    window.location.href="/drivers"
  }
  cancel() {
    //this.modal.dismiss(null, 'cancel');
    window.location.href='/truckviewbids'
  }
  
  
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  acceptBidStatus(){

    var data={
      trukisActive:"In-Progress"
    }
   // console.log(data)

    
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/vehicleinprogress/" + this.trukDocId, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
        this.acceptBidS()
          this.products = result  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
          this.all()
     
        //window.location.reload()  // reloading window

      }

      ).catch(err =>
        console.log(err))
}
}
