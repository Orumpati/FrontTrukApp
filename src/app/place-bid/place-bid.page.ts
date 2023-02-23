import { Component, OnInit,ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.page.html',
  styleUrls: ['./place-bid.page.scss'],
})
export class PlaceBidPage implements OnInit {
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

  constructor(private route:Router,
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
this.getfullarray()
  
//this.finalAcceptforBid =JSON.parse(localStorage.getItem("finalAcceptforBid") ||'{}')
   // console.log(this.finalAcceptforBid)
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
        console.log(result) //getting full array
        if(result.bids.length === 0){
          this.show=true
          this.hide=false
          
        }
       
        for(let i=0; i<result.bids.length;i++){
      this.final= result.bids[i]
      console.log(this.final) //inside an array
        }
        
          this.item = this.final.quoteBid //go inside bids array
          console.log(this.item)
          for(let i=0; i<this.item.BidActivity.length;i++){ //
            this.gettenprice =this.item.BidActivity[i]
            console.log(this.gettenprice)


            this.finalss= this.item.BidActivity
            console.log(this.finalss)
            this.num =this.item.BidActivity[i].userNo
              }
        console.log(this.finalss.length)
        
        if(this.finalss.length > 0){
          this.hide=true
          this.show= false
        }

        for(let i=0; i<this.finalss.length;i++){
          this.insidebidarray= this.finalss[i]
          console.log(this.insidebidarray)
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

acceptBid(){
  
  var body = {

  
    "_id": this.objects._id,
    "mobileNo":this.regdata.mobileNo,
    "userType":this.regdata.role,
    "Bidprice":this.objects.expectedPrice,
    "initialAccept" :"Accepted"

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
      
      


    }

    ).catch(err =>
      console.log(err))

}

initialBid(){
  console.log("working")
  console.log(this.newMsg)
  var body = {

  
    "_id":this.objects._id,
    "mobileNo": this.regdata.mobileNo,
    "userType":this.regdata.role,
    "Bidprice":this.newMsg
  
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
      
      


    }

    ).catch(err =>
      console.log(err))

}

negotiate(){
  var body = {

  
    "_id": this.objects._id,
    "mobileNo":this.regdata.mobileNo,
    "userNo":this.regdata.mobileNo,
    "userType":this.regdata.role,
    "price":this.NegoPrice
  
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
      
      


    }

    ).catch(err =>
      console.log(err))

}
acceptBidForFinal(){
  //this.getfullarray()
  var body = {
  
    
    "_id":this.objects._id,
    "mobileNo":this.regdata.mobileNo,
"isAgentAccepted":true

  
   }
   console.log(this.bids._id)
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
      
      


    }

    ).catch(err =>
      console.log(err))
  }


}
