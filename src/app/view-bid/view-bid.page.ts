import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-bid',
  templateUrl: './view-bid.page.html',
  styleUrls: ['./view-bid.page.scss'],
})
export class ViewBidPage implements OnInit {
  private refresh = new Subject<void>();
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
  typepay: any;
  
    constructor(public loadingController: LoadingController,public navControl:NavController,private router:Router) { }
  
    ngOnInit() {
      this.regdata =JSON.parse(localStorage.getItem('regdata') || '{}')
      this.bids = JSON.parse(localStorage.getItem("viewBid") || '{}');
      console.log(this.bids)
      this.openedBid =JSON.parse(localStorage.getItem('openedBid') || '{}')
      console.log(this.openedBid)
      this.bidactivityofopenbid =this.openedBid.BidActivity
      for(let i=0; i<this.bids.bids.length;i++){
           this.bidact=this.bids.bids[i]
      }

  this.all()
  
      this.autorefreshdata.subscribe(res =>{
        this.all()
      })
  }

  get autorefreshdata(){
return this.refresh
  }

  all(){
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteByid/"+ this.bids._id, {
    method: 'GET',
    headers: {
      "access-Control-Allow-Origin": "*",
  
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      this.typepay =result.typeOfPay
      this.paymentdone =result.isPaymentCompleted
      for(let i=0; i<result.length; i++){
    var final= result[i].bids
      }
      console.log(final)
        this.item = final

        this.filteredbid = this.item.filter((data:any)=>{
          return data._id == this.openedBid._id
        })
        console.log(this.filteredbid)
   for(let i=0;i<this.filteredbid.length;i++){
    this.conditions = this.filteredbid[i].isAgentAccepted
  
    this.agentconditions = this.filteredbid[i].isShipperAccepted
    this.onlybid =this.filteredbid[i].BidActivity
    this.tenprice = this.filteredbid[i].tentativefinalPrice
   }
console.log(this.onlybid)
        for(let i=0; i<this.item.length;i++){
          console.log(this.item[i])
          //this.goinsidebids =this.item[i]
          //this.finalAgentAccept =this.item[i]
         
       
          this.bidActivity= this.item[i].BidActivity
          console.log(this.bidActivity)
          this.bidnumber =this.item[i].mobileNo
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
      alert('Something went wrong')
      console.log(err)})
 
  }
    
  
    async negotiate(){
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
    
      var body = {
    
      
        "_id":this.bids._id,
        "mobileNo":this.openedBid.mobileNo, //evaritho negotiate chesthunnamo vadi mobile number
        "userNo":this.regdata.mobileNo,
        "userType":this.regdata.role,
        "price":this.NegoPrice,
        "TohideAcceptBtn":false,
        "Name":this.regdata.firstName+this.regdata.lastName,//for notifi 
        "Number":this.openedBid.mobileNo, //fornotifca
        "mess":"Placed a Bid for amount"
      
       }
       console.log(this.bids._id)
  console.log(this.bidnumber)
    
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
          window.location.reload()
          loading.dismiss()
          
    
    
        }
    
        ).catch(err =>{
          loading.dismiss()
          console.log(err)
        })
    
    }
  
    async acceptBid(){
      confirm("Are You Sure, To accept")
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
      var body = {
    
      
        "_id":this.bids._id,
        "mobileNo":this.openedBid.mobileNo,
        "isShipperAccepted":true,
        "bidAcceptedTo":this.openedBid.mobileNo,
         "Name":this.regdata.firstName+this.regdata.lastName,
         "Bidprice":this.tenprice,
         
        
        
         "Number":this.bidnumber, //transporte
         "mess":"Accepted your bid for"
      
       }
       console.log(this.bids._id)
  console.log(body)
    
      fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/initialacceptbyshipper", {
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
          const data = result.message
          console.log(data)
          localStorage.setItem('viewBid',JSON.stringify(data))
          this. acceptBidStatus()
          this.navControl.navigateForward('/view-bid')
          loading.dismiss()
    
    
        }
    
        ).catch(err =>{
          loading.dismiss()
          console.log(err)
        })
     
    }

    acceptBidStatus(){

      var data={
        isActive:"Completed"
      }
     // console.log(data)
  
      console.log(this.bids._id)
      fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteDeactivate/" + this.bids._id, {
        method: 'PUT',
        headers: {
          "access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  
      })
        .then(response => response.json())
        .then(result => {
          console.log(result),
  
            this.products = result  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
  
       
          window.location.reload()  // reloading window
  
        }
  
        ).catch(err =>
          console.log(err))
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
    this.router.navigate(['add-new-truck-details'])
    localStorage.setItem("loadItem",JSON.stringify(this.bids._id))
    window.location.href="/add-new-truck-details"
    
  }
}
