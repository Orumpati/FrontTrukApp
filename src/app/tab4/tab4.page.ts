import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LoadingController, ToastController } from '@ionic/angular';
import {  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  item: any = [];

  filter: any
  categories = ['LCV', 'Truk', 'Hyva', 'container', 'Tanker'];
  // lcv = false;
  // truck = false;
  // hyva = false;
  // container = false;
  // tanker = false;
  // trailer = false;
  trukvehiclenumber: any;
  trukcapacity: any;
  trukname: any;
  trukcurrentLocation: any;
  selectedItems: any;
  items: any = [];
  OpenTruck:any;

  trukdropLocation: any;
  trukpickupLocation: any;

  dropdownList: any[] = [];
  trukoperatingRoutes: any = [];
  dropdownSettings!: IDropdownSettings;
  length: any;
  routes: any;
  itemlen: any;

  constructor(private router:Router, private toastController: ToastController,public loadingController: LoadingController) { }

  ngOnInit() {

    //this.getAllvehicle()
   // this.vehicleSearch()
   this.getAllvehicles()
    this.dropdownList = [
      'Mumbai',
      'Bangaluru',
      'Pune',
      'Navsari',
      'New Delhi'
    ];
    this.trukoperatingRoutes = [

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
ionViewDidEnter(){
  this.getAllvehicles()
}
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onCategoryChange(category: any) {
    console.log(category)

  }
  /*async presentToast(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'all LCV vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });

    await toast.present();
  }
  async all(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'All Vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });
    await toast.present();
  }

  async opentruk(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'All openTruk vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });
    await toast.present();
  }
  async hyva(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'all hyva vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });
    await toast.present();
  }
  async container(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'All container Vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });
    await toast.present();
  }
  async tanker(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'All Tanker Vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });
    await toast.present();
  }
  async trailer(position:  'middle') {
    const toast = await this.toastController.create({
      message: 'All Trailer Vehicles!',
      duration: 500,
      position: position,
      color:'warning'
    });
    await toast.present();
  }*/

  toggle(trukname: any) {
    console.log(trukname)
    this.filter = trukname
    this.get()
    console.log(trukname)
  }


  // getAllvehicle() {

  //   var data = {
  //     trukdropLocation: this.trukdropLocation,
  //     trukpickupLocation: this.trukpickupLocation
  //   }
  //   fetch("http://localhost:3000/addTruk/vehicleSearch", {
  //     method: 'POST',
  //     headers: {
  //       "access-Control-Allow-Origin": "*",

  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log(result)
  //         this.item = result.doc
  //       console.log(this.item)
  //     }

  //     ).catch(err =>
  //       console.log(err))
  // }

  async get() {

    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/filterByVehicle/" + this.filter, {
      method: 'GET',
      headers: {
        "access-Control-Allow-Origin": "*",

      },

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.vehicle
          this.itemlen =this.item.length
          console.log(this.itemlen)
        loading.dismiss()
        console.log(this.item)

      }

      ).catch(err =>{

      loading.dismiss()
      //alert('Something went wrong')
        console.log(err)})
  }
  async getOperatingroutes(data: any) {
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    this.filter = data
    console.log(this.filter, this.trukpickupLocation, this.trukdropLocation)

    if (this.filter && this.trukpickupLocation && this.trukdropLocation) {

      fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/filterBytrukoperatingRoutes/" + this.filter + "/" + this.trukpickupLocation + "/" + this.trukdropLocation, {
        method: 'GET',
        headers: {
          "access-Control-Allow-Origin": "*",

        },

      })
        .then(response => response.json())
        .then(result => {
          loading.dismiss()
          console.log(result),
            this.item = result.vehicle
            this.itemlen =this.item.length

          console.log(this.item)

        }

        ).catch(err =>{
loading.dismiss()
       // alert("Something went wrong")
          console.log(err)})
    }
    else {
      this.get()
loading.dismiss()
    }
  }
  //vehileSearch based on routes
   //vehileSearch based on routes
   vehicleSearch() {

    if (this.trukdropLocation && this.trukpickupLocation) {
      var data = {
        trukdropLocation: this.trukdropLocation,
        trukpickupLocation: this.trukpickupLocation
      }

      fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/vehicleSearch", {
        method: 'Post',
        headers: {
          "access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data),

      })
        .then(response => response.json())
        .then(result => {
          console.log(result),
            this.item = result.doc
          // this.testForms.reset();
        }

        ).catch(err =>
          console.log(err))
    }
    else {
     this.getAllvehicles()
    }

  }

  getAllvehicles(){
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/allVehicles", {
      method: 'GET',
      headers: {
        "access-Control-Allow-Origin": "*",

      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
        this.itemlen =result.TotalProducts
          this.item = result.Load
        console.log(this.item)
      }

      ).catch(err =>
        console.log(err))
  }


  SendData(data:any){
    console.log(data)
    localStorage.setItem("selectedTruk", JSON.stringify(data));
    this.router.navigate(['attach-load'])
    //The localStorage object allows you to save key/value pairs in the browser.
  }
  AttachNewLoad(data:any){
    console.log(data)
    localStorage.setItem("AttachNewLoad", JSON.stringify(data));
    this.router.navigate(['attach-prefferd-newload'])
  }


}