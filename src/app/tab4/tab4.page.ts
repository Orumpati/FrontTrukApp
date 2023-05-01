import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LoadingController, ToastController } from '@ionic/angular';
import {  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  item: any = [];

  filter: any
  categories = ['LCV', 'Truk', 'Hyva', 'container', 'Tanker'];

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
  truckshift: any;
  loortr: any;
  logindata: any;
  language:any;
  lang: any;
  activeVeh: any;

  constructor(private router:Router, private toastController: ToastController,public loadingController: LoadingController,private translateConfigService: TranslateConfigService, private translate: TranslateService,) {

    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
   }

  ngOnInit() {
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
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
    this.loortr =JSON.parse(localStorage.getItem('lookingfor') || '{}')


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
    fetch("https://trukapp2023.herokuapp.com/addTruk/filterByVehicle/" + this.filter, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",

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

      fetch("https://trukapp2023.herokuapp.com/addTruk/filterBytrukoperatingRoutes/" + this.filter + "/" + this.trukpickupLocation + "/" + this.trukdropLocation, {
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

      fetch("https://trukapp2023.herokuapp.com/addTruk/vehicleSearch", {
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
    fetch("https://trukapp2023.herokuapp.com/addTruk/allVehicles", {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",

      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
       
          this.activeVeh = result.Load
          this.item = this.activeVeh.filter((data: { trukisActive: any; }) =>{
            return data.trukisActive == 'Active'
          })
          this.itemlen =result.item.length
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
  looking(){
    this.truckshift ="trucks"
      localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
      //this.router.navigate(['tab/shipperhome'])
  window.location.href='/tab/shipperhome'
    }
    lookingload(){
    this.truckshift ="loads"
      localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
      window.location.href='/tab/shipperhome'
  //this.router.navigate('shipperhome')
    }

}