import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-truck-details',
  templateUrl: './add-new-truck-details.page.html',
  styleUrls: ['./add-new-truck-details.page.scss'],
})
export class AddNewTruckDetailsPage implements OnInit {

  toppings: any;
  data: any;
  dropdownList: any[] = [];
  operatingRoutes: any = [];
  dropdownSettings!: IDropdownSettings;
  vehicleNo: any;
  vehicleCurrentLocation: any;
  vehicleCapacity: any;
  Items: any;
  date: any;
  isTrukOpenOrClose:any
  DriverName: any;
  DriverNumber: any;
  vehicleType:any;
 _id: any;
  sub: any;
  transporterName:any;
  companyName:any;
  mobileNumber:any;
  city:any;
  constructor(public loadingController: LoadingController,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
this.sub =JSON.parse(localStorage.getItem("loadItem") || '{}')
  
    console.log(this.sub)
    this.dropdownList = [
      'Mumbai',
      'Bangaluru',
      'Pune',
      'Navsari',
      'New Delhi'
    ];
    this.operatingRoutes = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }



  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  out(data: any) {
    console.log(data)

    this.vehicleType = data
    // console.log(this.data)

  }
  async NewPostAdd() {

    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      _id:this.sub,
      operatingRoutes: this.operatingRoutes,
      vehicleType: this.vehicleType,
      vehicleNo: this.vehicleNo,
      vehicleCurrentLocation: this.vehicleCurrentLocation,
      vehicleCapacity: this.vehicleCapacity,
      date: this.date,
      isTrukOpenOrClose:this.isTrukOpenOrClose,
      DriverName: this.DriverName,
      DriverNumber: this.DriverNumber,
      shareContact:true,

      transporterName:this.transporterName,
      companyName:this.companyName,
      mobileNumber:this.mobileNumber,
      city:this.city,
     


    }
    console.log(data)
    localStorage.setItem("newpostAdd", JSON.stringify(data));

    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/attachVehicleToLoad", {
      method: 'post',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.Items = result     
        loading.dismiss()
        alert("Posted Successfully")
window.location.href="/place-bid"
      }

      ).catch(err =>{
        
        console.log(err)
        loading.dismiss()
      })
  }
  routeto(){
    this.router.navigate(['place-bid'])
  }
}
