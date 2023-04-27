import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CommonServiceService } from '../common-service.service';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-view-bid',
  templateUrl: './view-bid.page.html',
  styleUrls: ['./view-bid.page.scss'],
})
export class ViewBidPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal ;
  
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
  transNo: any;
  filteredbid: any;
  onlybid: any;
  conditions: any;
  agentconditions: any;
  products: any;
  tenprice: any;
  paymentdone: any;
  typepay: any;
  shareContact: any;
  driverdetails: any;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  driver: any;
  payId: any;
  hideaccptbtn: any;
  isPaymentCompleted: any;
  TohideNegoshit: any;
  mess:any="copied Successfully"
  data: any;
  truckOwnerNum: any;
  language: any;
  lang: any;
    constructor(public loadingController: LoadingController,public navControl:NavController,private router:Router,private commservice:CommonServiceService,private clipboard:Clipboard,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {
      this.commservice.listen().subscribe((m:any)=>{
        console.log(m);
        this.all();
      })

      
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
     }
  
    ngOnInit() {
      this.regdata =JSON.parse(localStorage.getItem('regdata') || '{}')
      this.lang = JSON.parse(localStorage.getItem('language')||'{}')
      this.translateConfigService.setLanguage(this.lang);
      this.bids = JSON.parse(localStorage.getItem("viewBid") || '{}');
      //this.typepay =this.bids.typeOfPay
      console.log(this.bids)
      console.log(this.typepay)
      this.openedBid =JSON.parse(localStorage.getItem('openedBid') || '{}')
      console.log(this.openedBid)
      this.transNo =this.openedBid.mobileNo
      console.log(this.transNo)
      for(let i=0; i<this.bids.bids.length;i++){
           this.bidact=this.bids.bids[i]
      }

  this.all()
  
      
  }



  all(){
    fetch("https://trukapp2023.herokuapp.com/quotes/quoteByid/"+ this.bids._id, {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
  
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      //this.typepay = result.typeOfPay
      
      for(let i=0; i<result.length; i++){
        this.payId = result[i].paymentId
        this.driverdetails = result[i].vehicleInformation[i]
        this.shareContact =result[i].shareContact
        this.isPaymentCompleted =result[i].isPaymentCompleted
        this.TohideNegoshit =result[i].TohideNegoshit
        this.typepay =result[i].typeOfPay
    var final= result[i].bids
      }
      localStorage.setItem('driverdetails',JSON.stringify(this.driverdetails))

  console.log(this.driverdetails)
      console.log(final)
       // this.item = final
        this.item = final.filter((data:any)=>{
          return data._id == this.openedBid._id
        })

//onsole.log(this.onlybid)
        for(let i=0; i<this.item.length;i++){
          console.log(this.item[i])
          //this.goinsidebids =this.item[i]
          //this.finalAgentAccept =this.item[i]
          this.paymentdone =this.item[i].isPaymentCompleted
       
          this.bidActivity= this.item[i].BidActivity
          console.log(this.bidActivity)
          this.agentconditions = this.item[i].isShipperAccepted
          this.tenprice = this.item[i].tentativefinalPrice
          this.conditions = this.item[i].isAgentAccepted
          this.bidnumber =this.item[i].mobileNo
            }
           
            console.log(this.item)
       for(let i=0;i<this.item.length;i++){
         this.hideaccptbtn =this.item[i].TohideAcceptBtn
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
          for(let i=0; i<this.driverdetails.length; i++){
            this.driver =this.driverdetails[i]
          }
     console.log(this.driver)
    }
  
    ).catch(err =>{
     // alert('Something went wrong')
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
        Number:this.openedBid.mobileNo, //fornotifca
        "mess":"Placed a Bid for amount"
      
       }
       console.log(this.bids._id)
  console.log(this.bidnumber)
    
      fetch("https://trukapp2023.herokuapp.com/quotes/updateBids", {
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
          this.all()
         // window.location.reload()
         
          loading.dismiss()
          //this.refreshData()
    
    
        }
    
        ).catch(err =>{
          loading.dismiss()
          console.log(err)
        })
    
    }
  
    async acceptBid(){
      if(confirm("Once you accept the bid, you cannot negotiate")){
      if(this.regdata.aadharVerify == 'notVerified' ){
        alert("Verify Aadhar to Accept")
  window.location.href='/profile'
      }else{
      //confirm("Are You Sure, To accept")*/
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
        "TohideAcceptBtn":false,
        "BidStatus":"closed",
        "shipperAccept":true,
        "contactSharedNum":this.openedBid.mobileNo,
         "Name":this.regdata.firstName+this.regdata.lastName,
         "Bidprice":this.tenprice,
         Number:this.bidnumber, //transporte
         "mess":"Accepted your bid for"
      
       }
       console.log(this.bids._id)
  console.log(body)
    
      fetch("https://trukapp2023.herokuapp.com/quotes/initialacceptbyshipper", {
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
          for(let i=0;i<data.length;i++){
            this.truckOwnerNum =data[i].TruckMarketVehicle[i].trukOwnerNumber
          }
          localStorage.setItem('viewBid',JSON.stringify(data))
         // this. acceptBidStatus()
          this.navControl.navigateForward('/view-bid')
         
          loading.dismiss()
    this.acceptBidStatus()
    this.truckisactive()
          this.all()
        }
    
        ).catch(err =>{
          loading.dismiss()
          console.log(err)
        })
      }
    }
    }

  //change trucisActive in
  async truckisactive() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      trukOwnerNumber:this.truckOwnerNum,
      trukisActive:'In-Progress'
     
    }
    // console.log(data)
  
  
    fetch("https://trukapp2023.herokuapp.com/addTruk/truksByStatusAndNumber", {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  
    })
      .then(res => res.json())
      .then(result => {
        console.log(result),
  
        

  loading.dismiss()
        //window.location.reload()  // reloading window
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }

acceptBidStatus(){

  var data={
    isActive:"inprogress"
  }
 // console.log(data)

  
  fetch("https://trukapp2023.herokuapp.com/quotes/quoteDeactivate/" + this.bids._id, {
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

  makepayment(){
    localStorage.setItem('filteredBid',JSON.stringify(this.filteredbid))
    localStorage.setItem('DocId',JSON.stringify(this.bids._id))
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }



  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  copyString(){
    this.clipboard.copy(this.driverdetails.mobileNumber);
    //this.clipboard.copy(this.logindata.referalCode)
    alert(this.mess)
  }
  copy(){
    this.clipboard.copy(this.driverdetails.DriverNumber);
    //this.clipboard.copy(this.logindata.referalCode)
    alert(this.mess)
  }
}
