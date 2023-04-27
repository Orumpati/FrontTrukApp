import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-new-trukfortrukbid',
  templateUrl: './add-new-trukfortrukbid.page.html',
  styleUrls: ['./add-new-trukfortrukbid.page.scss'],
})
export class AddNewTrukfortrukbidPage implements OnInit {

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
  trukDocId: any;
  logindata: any;
  subNum: any;
  language: any;
  lang: any;
  constructor(public loadingController: LoadingController,private route: ActivatedRoute,private router:Router,private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 
    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata') || '{}')
this.sub =JSON.parse(localStorage.getItem("loadItem") || '{}')
//this.trukDocId = JSON.parse(localStorage.getItem('loadDocId') || '{}')
this.subNum =JSON.parse(localStorage.getItem("loadItemMobile") || '{}') 
this.trukDocId =JSON.parse(localStorage.getItem('loadDocId') || '{}')
    console.log(this.sub)
    console.log(this.trukDocId)
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
      contactSharedNum:this.logindata.mobileNo,
      transporterName:this.logindata.firstName +this.logindata.lastName,
      companyName:this.logindata.companyName,
      mobileNumber:this.logindata.mobileNo,
      city:this.logindata.city,
    //  Number:this.subNum,
    //   mess:"shared contact",
    //   Name:this.logindata.firstName +this.logindata.lastName,
    //   Bidprice:"Details"

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
        console.log(result),
          this.Items = result  
       
          this. acceptBidStatus()  
          this.isactiveComplete()
        loading.dismiss()
        alert("Posted Successfully")
//window.location.href="/truckviewbids"
this.router.navigate(['truckviewbids'])
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
        this.isactiveComplete() 
        //  this.products = result  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions
  
        //  this.all()
        //window.location.reload()  // reloading window
  
      }
  
      ).catch(err =>
        console.log(err))
  }
  






//make status complete in truck details
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


  fetch("https://trukapp2023.herokuapp.com/addTruk/vehicleinprogress/" + this.trukDocId, {
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

  routetotrukviewbid(){
    this.router.navigate(['truckviewbids'])
    window.location.href='/truckviewbids'
  }

}
