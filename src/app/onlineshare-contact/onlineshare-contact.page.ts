import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-onlineshare-contact',
  templateUrl: './onlineshare-contact.page.html',
  styleUrls: ['./onlineshare-contact.page.scss'],
})
export class OnlineshareContactPage implements OnInit {
  DocId: any;
  vehicleType: any;
  vehicleNo: any;
  DriverName: any;
  DriverNumber: any;
  location: any;
  trukDocId: any;

  constructor(public loadingController: LoadingController,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.DocId =JSON.parse(localStorage.getItem('loadItemOnline') || '{}')
    console.log(this.DocId)
    this.location =JSON.parse(localStorage.getItem('locatioPath') || '{}')
    this.trukDocId = JSON.parse(localStorage.getItem('loadDocId') || '{}')
  }

  async NewPostAdd() {

   const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      _id:this.DocId, //642423272a83bde152824077
     // operatingRoutes: this.operatingRoutes,
      vehicleType: this.vehicleType,
      vehicleNo: this.vehicleNo,
     // vehicleCurrentLocation: this.vehicleCurrentLocation,
    //  vehicleCapacity: this.vehicleCapacity,
     // date: this.date,
    //  isTrukOpenOrClose:this.isTrukOpenOrClose,
      DriverName: this.DriverName,
      DriverNumber: this.DriverNumber,
      shareContact:true,

      /*transporterName:this.transporterName,
      companyName:this.companyName,
      mobileNumber:this.mobileNumber,
      city:this.city,*/
     


    }
    console.log(data)
    //localStorage.setItem("newpostAdd", JSON.stringify(data));

    fetch("https://trukapp2023.herokuapp.com/quotes/attachVehicleToLoad", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
         // this.Items = result  
          this.isactiveComplete()   
        loading.dismiss()
        alert("Posted Successfully")
window.location.href="/place-bid"
      }

      ).catch(err =>{
        
        console.log(err)
        loading.dismiss()
      })
  }
  

  async NewPostAddOnline() {

    const loading = await this.loadingController.create({
       message: 'Loading...',
       spinner: 'crescent'
     });
     await loading.present();
     var data = {
       _id:this.DocId, //642423272a83bde152824077
      // operatingRoutes: this.operatingRoutes,
       vehicleType: this.vehicleType,
       vehicleNo: this.vehicleNo,
      // vehicleCurrentLocation: this.vehicleCurrentLocation,
     //  vehicleCapacity: this.vehicleCapacity,
      // date: this.date,
     //  isTrukOpenOrClose:this.isTrukOpenOrClose,
       DriverName: this.DriverName,
       DriverNumber: this.DriverNumber,
       shareContact:true,
       DriverStatus:"Active"
 
       /*transporterName:this.transporterName,
       companyName:this.companyName,
       mobileNumber:this.mobileNumber,
       city:this.city,*/
      
 
 
     }
     console.log(data)
     //localStorage.setItem("newpostAdd", JSON.stringify(data));
 
     fetch("https://trukapp2023.herokuapp.com/quotes/attachVehicleToLoad", {
       method: 'post',
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Content-Type": 'application/json'
       },
       body: JSON.stringify(data),
 
     })
       .then(response => response.json())
       .then(result => {
         console.log(result),
          // this.Items = result  
          // this.isactiveComplete()   
         loading.dismiss()
         alert("Posted Successfully")
         this.isactiveComplete()
        window.location.href="/truckviewbids"
       }
 
       ).catch(err =>{
         
         console.log(err)
         loading.dismiss()
       })
   }


   async isactiveComplete() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    
    var data = {
      trukisActive: "Completed"
    }
    // console.log(data)
  
  
    fetch("https://trukapp2023.herokuapp.com/addTruk/TrukDeactive/" + this.trukDocId, {
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
  
         // this.products = JSON.parse(result)  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
  
  loading.dismiss()
        //window.location.reload()  // reloading window
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }
  

}
