import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
@Component({
  selector: 'app-mytrucks',
  templateUrl:'./mytrucks.page.html' ,
  styleUrls: ['./mytrucks.page.scss'],
})
export class MytrucksPage implements OnInit {

  item: any = [];
  TurkActive: any;
  _id: any;
  trukvehiclenumber: any;
  trukcapacity: any;
  trukname: any;
  OriginLocation: any;
  trukoperatingRoutes: any;
   trukisActive: any
  products: any;
  logindata: any;
  isTruckActive: any;
  itemlen: any;
  trukveh: any;
  filterbytrukname: any;
  loadwithvehicle: any;


  constructor(public loadingController: LoadingController,private router:Router) {
    //this.gettruckbidata()
   
   }


  ngOnInit(): void {
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    this.get()
  //this.active()
  
  //this.toggles()
   // this.viewTruckSpecificLoads()

  }



  deactive() {
    
    this.Truk()
    
  }
  completedtog(){
this.completed()
  }

  inprogress(){
    this.inproge()
      }
  async get() {
    this.toggles()
    const loading = await this.loadingController.create({
      //message: 'Loading...',
      spinner: 'lines'
    });
    await loading.present();
    var data ={
      trukOwnerNumber:this.logindata.mobileNo
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/truksByStatusAndNumber", {
      method: 'POST',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body:JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
          this.item = result.vehicle
          this.itemlen =result.TotalVehicles
       
        loading.dismiss()
        console.log(this.item)
      }

      ).catch(err =>{
loading.dismiss()
        console.log(err)})
  }



  SendData(data: any) {
    console.log(data)
    localStorage.setItem("TrukPosted", JSON.stringify(data));
    //The localStorage object allows you to save key/value pairs in the browser.
  }



  // Isactive Functionality
  async isactive(Data: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(Data._id)
    var data = {
      trukisActive: "Deactive"
    }
    // console.log(data)


    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/TrukDeactive/" + Data._id, {
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

          this.products = JSON.parse(result)  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions

loading.dismiss()
        //window.location.reload()  // reloading window

      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }

//get based on login number
async toggles() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var data = {
    trukOwnerNumber:String(this.logindata.mobileNo),
    trukisActive:'Active'
   
  }
  // console.log(data)


  fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/truksByStatusAndNumber", {
    method: 'POST',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

  })
    .then(res => res.json())
    .then(result => {
      console.log(result),

        this.item= result.vehicle 
        this.itemlen =result.TotalVehicles
        //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
console.log(this.item)
for(let i=0;i<this.item.length;i++){
  this.trukveh =this.item[i]
}
loading.dismiss()
      //window.location.reload()  // reloading window

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
    })
}




async completed() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var data = {
    trukOwnerNumber:String(this.logindata.mobileNo),
    trukisActive:'Completed'
   
  }
  // console.log(data)


  fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/truksByStatusAndNumber", {
    method: 'POST',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

  })
    .then(res => res.json())
    .then(result => {
      console.log(result),

        this.item= result.vehicle
        this.itemlen =result.TotalVehicles  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
console.log(this.item)
loading.dismiss()
      //window.location.reload()  // reloading window

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
    })
}



  async deleteTruk(id: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/deleteTruk/" + id, {
      method: 'DELETE',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'text/plain'

      },


    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.get()
        loading.dismiss()
      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)})

  }


 

  async Truk() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      trukOwnerNumber:String(this.logindata.mobileNo),
      trukisActive:'Deactive'
     
    }
    // console.log(data)
  
  
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/truksByStatusAndNumber", {
      method: 'POST',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  
    })
      .then(res => res.json())
      .then(result => {
        console.log(result),
  
          this.item= result.vehicle
          this.itemlen =result.TotalVehicles  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
  console.log(this.item)
  loading.dismiss()
        //window.location.reload()  // reloading window
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }
  async inproge(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      trukOwnerNumber:String(this.logindata.mobileNo),
      trukisActive:'In-Progress'
     
    }
    // console.log(data)
  
  
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/truksByStatusAndNumber", {
      method: 'POST',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  
    })
      .then(res => res.json())
      .then(result => {
        console.log(result),
  
          this.item= result.vehicle
          this.itemlen =result.TotalVehicles  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
  console.log(this.item)
  loading.dismiss()
        //window.location.reload()  // reloading window
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }

  moredetails(data:any){
    console.log(data)
    localStorage.setItem("TrukmoreDetails", JSON.stringify(data));
  }

viewTruckSpecificLoads(){
var data ={
  trukOwnerNumber:"8897820507"
}
 fetch("http://localhost:3000/quotes/LoadsForSpecificTruck", {
      method: 'POST',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.loadwithvehicle =result.data
        console.log(this.loadwithvehicle)
      //  this.gettruckbidata()
       /* for(let i=0;i<result.data.length;i++){
          var gg =result.data[i].TruckMarketVehicle
        }
        console.log(gg)
  this. filterbytrukname = gg.filter((data: any) =>{
    return data.trukvehiclenumber == this.trukveh.trukvehiclenumber
  })
  console.log(this.filterbytrukname)*/
            //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
  
  
        //window.location.reload()  // reloading window
  
      }
  
      ).catch(err =>{
       // loading.dismiss()
        console.log(err)
      })
}

/*gettruckbidata(){
  console.log("working")
 // var truckno = trukvehNumber;
 //this.active()
 this.toggles()
  var totaltruks =this.item
  console.log(totaltruks)
  for(let j=0;j<this.item.length;j++){
  for(let i=0;i<this.loadwithvehicle.length;i++){
 
         if(this.item.vehicle[0].trukvehiclenumber == this.loadwithvehicle[i].TruckMarketVehicle[0].trukvehiclenumber){
          console.log(this.loadwithvehicle[i])
         }
  }
  }
}*/


bidbyId(text:any){
  console.log(text.trukvehiclenumber)

  localStorage.setItem("loadDocId",JSON.stringify(text._id))
  localStorage.setItem("truckallBids",JSON.stringify(text.trukvehiclenumber))
  this.router.navigate(['trukallbids'])
  window.location.href='/trukallbids'
}

}
