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


  AtleastOneBidisClosed= false
  allbidsfor: any;
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
  fetch("https://trukapp2023.herokuapp.com/quotes/getsingleloadbids", {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
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

console.log(this.allbids)
      for(let i=0; i<this.allbids.length;i++){
        this.allbidsfor =this.allbids[i].BidStatus
        console.log(this.allbidslen)
           if(this.allbidsfor == "closed" && this.allbidslen >= 2) {
            console.log(this.allbidsfor)
            this.AtleastOneBidisClosed = true
           }else if(this.allbidsfor == "closed" && this.allbidslen <=1){
            this.AtleastOneBidisClosed = true
           }               //this is to see any one bid is closed
        this.bidact = this.allbids[i].BidActivity
        this.bidactlen = this.allbids[i].BidActivity.length
        this.mo = this.allbids[i].mobileNo
        
      }
      
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
console.log(data)
localStorage.setItem('openedBid',JSON.stringify(data))
//this.router.navigate(['view-bid'])
//this.navController.navigateForward('/view-bid')
window.location.href='/view-bid'
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }

}
