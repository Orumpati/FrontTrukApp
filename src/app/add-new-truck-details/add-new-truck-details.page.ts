import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
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
  regdata: any;
  subNum: any;
  language: any;
  lang: any;
  constructor(public loadingController: LoadingController,private route: ActivatedRoute,private router:Router,private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    this.regdata =JSON.parse(localStorage.getItem("regdata") || '{}')
this.sub =JSON.parse(localStorage.getItem("loadItem") || '{}')
this.subNum =JSON.parse(localStorage.getItem("loadItemMobile") || '{}') 
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

    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
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


      Number:this.subNum,
      contactSharedNum:this.regdata.mobileNo,
      transporterName:this.regdata.firstName +this.regdata.lastName,
      companyName:this.regdata.companyName,
      mobileNumber:this.regdata.mobileNo,
      city:this.regdata.city,
    //  mess:"shared contact",
    //  Name:this.regdata.firstName +this.regdata.lastName,
    //  Bidprice:"Details"


    }
    console.log(data)
    localStorage.setItem("newpostAdd", JSON.stringify(data));

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
        console.log(result)
        this.acceptBidStatus() 
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



  acceptBidStatus(){

    var data={
      isActive:"Completed"
    }
   // console.log(data)

    console.log(this.sub)
    fetch("https://trukapp2023.herokuapp.com/quotes/quoteDeactivate/" + this.sub, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

    })
      .then(response => response.json())
      .then(result => {
        console.log(result)

        //  this.products = result  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions

        //  this.all()
        //window.location.reload()  // reloading window

      }

      ).catch(err =>
        console.log(err))
}
  goback(){
    this.router.navigate(['place-bid'])
    window.location.href='/place-bid'
  }

  routetotrukviewbid(){
    this.router.navigate(['truckviewbids'])
    window.location.href='/truckviewbids'
  }
}
