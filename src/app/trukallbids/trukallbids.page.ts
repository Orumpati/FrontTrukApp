import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
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
  loadeddata: any;
  totalloadTAll: any;
  AtleastOneBidisClosed=false
  shipper: any;
  language: any;
  lang: any;
  username: any;
  constructor(private router:Router,public navController : NavController,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
   }
  ionViewDidEnter(){
  this.all()
  }
  ngOnInit() {
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
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
   fetch("https://trukapp2023.herokuapp.com/quotes/LoadsForSpecificTruck", {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data), 
    
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          
          this.loadwithvehicle = result.data
          console.log(this.loadwithvehicle)
          for(let i=0;i<this.loadwithvehicle.length;i++){
            this.totalloadTAll =this.loadwithvehicle[i]
            
            this.loadeddata =this.loadwithvehicle[i].bids
          }
          localStorage.setItem('totalloadTAll',JSON.stringify(this.totalloadTAll))
          console.log(this.loadeddata)
          console.log(this.totalloadTAll)
          for(let i=0;i<this.loadeddata.length;i++){
            this.bidact = this.loadeddata[i].isAgentAccepted
            this.shipper = this.loadeddata[i].isShipperAccepted
            this.bidactlen = this.loadeddata[i].BidActivity.length
            this.username = this.loadeddata[i].UserName
            if(this.bidact.BidStatus == 'closed') {
          
              this.AtleastOneBidisClosed = true
             }    else{
              this.AtleastOneBidisClosed = false
             } 
            //this.mo = this.allbids[i].mobileNo
          }
          console.log(this.bidact)
         
        
    
        }
    
        ).catch(err =>{
          console.log(err)
        })
}
  openbid(data:any){
console.log(data)
localStorage.setItem('openedBid',JSON.stringify(data))
this.router.navigate(['truckviewbids'])
window.location.href='/truckviewbids'
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
