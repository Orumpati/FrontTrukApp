import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-all-bids',
  templateUrl: './all-bids.page.html',
  styleUrls: ['./all-bids.page.scss'],
})
export class AllBidsPage implements OnInit {
  singlearray: any;
  allbids: any;
  onlybids: any;
  filterShipperAccpt: any;
  sai: any;
  allbidslen: any;
  mo: any;
  bidact: any;
  tranNum: any;
  usNo: any;
  bidactlen: any;

  constructor(private router:Router,public navController : NavController,) { }
  ionViewDidEnter(){
  this.all()
  }
  ngOnInit() {
    this.singlearray =JSON.parse(localStorage.getItem("viewBid") || '{}')
    this.onlybids =this.singlearray.bids

    console.log(this.onlybids)
this.all()
   


   
  }
all(){
  var data ={
    "_id":this.singlearray._id
  }
  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/getsingleloadbids", {
    method: 'POST',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),      

  })
    .then(response => response.json())
    .then(result => {
      console.log(result.message)

      for(let i=0; i<result.message.length;i++){
        this.allbids =result.message[i].bids
        this.allbidslen =result.message[i].bids.length
        
      }

      for(let i=0; i<this.allbids.length;i++){
        this.bidact = this.allbids[i].BidActivity
        this.bidactlen = this.allbids[i].BidActivity.length
        this.mo = this.allbids[i].mobileNo
      }
      console.log(this.bidactlen)
      this.tranNum= this.bidact.filter((data:any)=>{
        return  data.userNo == this.mo
        })  
        console.log(this.tranNum)

        for(let i=0; i<this.tranNum.length;i++){
          this.usNo =this.tranNum[i].userType
        }
        console.log(this.usNo)
      this.filterShipperAccpt = this.allbids.filter((data:any)=>{
      return  data.isShipperAccepted == true
      })
      console.log(this.filterShipperAccpt)

   for(let i=0; i<this.filterShipperAccpt.length;i++){
    this.sai =this.filterShipperAccpt[i].isShipperAccepted
   }
    

    }

    ).catch(err =>
      console.log(err))
}
  openbid(data:any){

localStorage.setItem('openedBid',JSON.stringify(data))
//this.router.navigate(['view-bid'])
this.navController.navigateForward('/view-bid')
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
route(){
  this.navController.navigateForward('/tab/tab1');
}
}
