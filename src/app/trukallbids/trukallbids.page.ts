import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-trukallbids',
  templateUrl: './trukallbids.page.html',
  styleUrls: ['./trukallbids.page.scss'],
})
export class TrukallbidsPage implements OnInit {

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
  truckallbids: any;
  details: any;
  showallbids: any;
  loadwithvehicle: any;

  constructor(private router:Router,public navController : NavController,) { }
  ionViewDidEnter(){
  this.all()
  }
  ngOnInit() {
    /*this.singlearray =JSON.parse(localStorage.getItem("viewBid") || '{}')
    this.onlybids =this.singlearray.bids*/
   this.truckallbids =JSON.parse(localStorage.getItem('truckallBids')|| '{}')
    console.log(this.truckallbids)
    for(let i=0; i<this.truckallbids.length;i++){
      this.showallbids =this.truckallbids[i].bids
      //this.allbidslen =result.message[i].bids.length
      
    }
//this.all()
   


   
  }
all(){

  var data ={
    trukvehiclenumber:this.truckallbids
  }
   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/LoadsForSpecificTruck", {
        method: 'POST',
        headers: {
          "access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data), 
    
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          this.loadwithvehicle = result.data
          console.log(this.loadwithvehicle)
    
        }
    
        ).catch(err =>{
          console.log(err)
        })
}
  openbid(data:any){
console.log(data)
localStorage.setItem('openedBid',JSON.stringify(data))
this.router.navigate(['truckviewbids'])
//this.navController.navigateForward('/truckviewbids')
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
route(){
  this.navController.navigateForward('/mytrucks');
}

}
