import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonModal) modal!: IonModal ;
  segmentValue='1';
  item: any = [];    //Storing the items data in the array
  isactive:any;
body={
  OriginLocation:'',
  DestinationLocation:'',
  date: '',
  vehicle: '',
  product: '',
  Quantity: '',

  expectedPrice: '',
  tonnes:'',
  Number:'',
  loadCapacity:'',

  typeOfPay:'',
  comments:'',
  length:'',
  breadth:'',
  height:''
}
  real: any;
  products: any;
  _id: any;
  load:any
  isActive:any;
  Id:any
  logindata: any;
  bids: any;
  searchtext:any
  inarray: any;
  intruckdata: any;
  sharcont: any;
  driverdetails: any;
  mess:any="copied Successfully"
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  items: any;
  loortr: any;
  truckshift: any;
  itemActive: any;
  itemShare: any;
  itemshi: any;
  constructor(private router:Router,public loadingController: LoadingController,public nav:NavController,private clipboard:Clipboard) {}

  

  segmentChanged(event:any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }


  ngOnInit():void{
    
   this.toggle(this.isActive="Active")
   this.activeGet()
   this.logindata =JSON.parse(localStorage.getItem('regdata')||'{}')
   console.log(this.logindata)
   //this.driverdetails =JSON.parse(localStorage.getItem('driverdetails')||'{}')
   this.loortr =JSON.parse(localStorage.getItem('lookingfor') || '{}')
  }
  ionViewDidEnter(){
    this.toggle(this.isActive="Active")
  }
  async get() {
    const loading = await this.loadingController.create({
      //message: '...',
      spinner: 'lines'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/allQuotes", {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",

      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.Loads
         console.log(this.item)
         loading.dismiss()
      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)})
  }


  sendData(data:any){
     console.log(data._id)
     localStorage.setItem("currentSelectedLoad",JSON.stringify(data));
  }



// Isactive Functionality
  async Isactive(docData:any){
    const loading = await this.loadingController.create({
      //message: 'Loading...',
      spinner: 'lines'
    });
    await loading.present();
    var data={
      isActive:"Deactive"
    }
   // console.log(data)

    console.log(docData)
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteDeactivate/" + docData._id, {
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

          this.products = result //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
loading.dismiss()
     
       window.location.reload()  // reloading window

      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)})
  }

  loadDetails(load: any) {
    //   console.log(load)
      localStorage.setItem("loadDetails", JSON.stringify(load));
      this.router.navigate(["load-details"])
     }

     bidById(bid: any) {
        localStorage.setItem("viewBid", JSON.stringify(bid));
       //this.router.navigate(["all-bids"])
       // this.nav.navigateForward('/all-bids')
        window.location.href='/all-bids'
       }

 
       toggle(isActive:any){
        this.isactive=isActive
        this.activeGet()
        console.log(isActive)
       }
       toggles(isActive:any){
        this.isactive=isActive
        this.deActiveGet()
        console.log(isActive)
       }
   
       toggless(isActive:any){
        this.isactive=isActive
        this.completedGet()
        console.log(isActive)
       }

       async activeGet(){
        const loading = await this.loadingController.create({
         // message: 'Loading...',
          spinner: 'lines'
        });
        await loading.present();
        console.log(this.isactive)
        var body={
          Number:this.logindata.mobileNo , isActive:"Active" 
        }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/loadsByStatusAndNumber" , {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.load
          loading.dismiss()
          for(let i=0;i<this.item.length;i++){
            this.inarray = this.item[i].TruckMarketVehicle.length
          }
          console.log(this.inarray.length)
          for(let i=0;i<this.inarray.length;i++){
            this.intruckdata = this.inarray[i].trukOwnerNumber
          }
         
          console.log(this.intruckdata)
         console.log(this.item)
       
      
      }

      ).catch(err =>{
        loading.dismiss()
  
        console.log(err)})
  }



  
  async deActiveGet(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(this.isactive)
    var body={
      Number: this.logindata.mobileNo, isActive:"Deactive" 
    }
fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/loadsByStatusAndNumber" , {
  method: 'POST',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": 'application/json'
  },
  body: JSON.stringify(body),
})
  .then(response => response.json())
  .then(result => {
    console.log(result),
      this.item = result.load
     console.log(this.item)
     loading.dismiss()
  }

  ).catch(err =>{
    loading.dismiss()
    console.log(err)
  })
}

  async inprogress(){
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  console.log(this.isactive)
  var body={
    Number: this.logindata.mobileNo, 
  
  }
fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/findLoadsInProgress" , {
method: 'POST',
headers: {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": 'application/json'
},
body: JSON.stringify(body),
})
.then(response => response.json())
.then(result => {
  console.log(result),
    this.items = result.data
    this.itemshi = this.items.filter((data: { shipperAccept: any; }) =>{
      return data.shipperAccept == true

    })
    this.itemActive = this.itemshi.filter((data: { isActive: any; }) =>{
      return data.isActive == 'inprogress'

    })
    console.log(this.itemActive)
    this.item = this.itemActive.filter((data: { shareContact: any; }) =>{
      return data.shareContact == false
      
    })
    // this.item = this.itemShare.filter((data: { contactSharedNum: any; }) =>{
    //   return data.contactSharedNum == this.logindata.mobileNo
      
    // })

   console.log(this.item)
   loading.dismiss()
}

).catch(err =>{
  loading.dismiss()
  console.log(err)})
}

  async completedGet(){
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  console.log(this.isactive)
  var body={
    Number: this.logindata.mobileNo,
     isActive:"Completed" 
  }
fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/loadsByStatusAndNumber" , {
method: 'POST',
headers: {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": 'application/json'
},
body: JSON.stringify(body),
})
.then(response => response.json())
.then(result => {
  console.log(result),
    this.item = result.load


   console.log(this.item)
   loading.dismiss()
}

).catch(err =>{
  loading.dismiss()
  console.log(err)
})
}
vehdetails(data:any){
  console.log(data)
  localStorage.setItem('vehdetails',JSON.stringify(data))
  window.location.href='/viewshippercon'

}

autorefresh(event:any){
   
  setTimeout(() => {

    event.target.complete()
    
    window.location.reload()
  }, 2000);
}

placebidById(data:any){
  localStorage.setItem("shipperplacebid",JSON.stringify(data))
  this.router.navigate(["shippernegoplacebid"])

}

cancel() {
  window.location.href='/tab/tab1'
}

  async repost(text:any){
    if(confirm('Are you sure, you want to reactivate?')){
    const loading = await this.loadingController.create({
      //message: 'Loading...',
      spinner: 'lines'
    });
    await loading.present();
    var data={
      isActive:"Active"
    }
   // console.log(data)

    //console.log(docData)
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteDeactivate/" + text._id, {
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

          this.products = result //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
loading.dismiss()
     
       window.location.reload()  // reloading window

      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)}) 
}
  }

  async delete(text:any){
    if(confirm('Are you sure, you want to delete?')){
  const loading = await this.loadingController.create({
    //message: 'Loading...',
    spinner: 'lines'
  });
  await loading.present();
  var data={
    isActive:"Delete"
  }
 // console.log(data)

  //console.log(docData)
  fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/quoteDeactivate/" + text._id, {
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

        this.products = result //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
loading.dismiss()
   
     window.location.reload()  // reloading window

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)})
    }
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    this.message = `Hello, ${ev.detail.data}!`;
  }
}
// copy(){
//   this.clipboard.copy(this.driverdetails.mobileNumber);
//   //this.clipboard.copy(this.logindata.referalCode)
//   alert(this.mess)
// }


looking(){
  this.truckshift ="trucks"
    localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
    window.location.href='/tab/shipperhome'
  }
  lookingload(){
  this.truckshift ="loads"
    localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
    window.location.href='/tab/shipperhome'
//this.router.navigate('shipperhome')
  }

}
