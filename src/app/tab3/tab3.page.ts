import { Component, OnInit ,NgZone } from '@angular/core';
import  firebase from 'firebase/compat/app';
import { AuthpaymentService } from '../authpayment.service';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//declare var google :any;
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  rzp1:any
  
citys:any
  cities: string[] | undefined;
  location:any;
  cityName: string = '';
  autocompleteResults: google.maps.places.AutocompletePrediction[] = [];
  constructor(private auth:AuthpaymentService,private modal:ModalController,private alert:AlertController,public loadingController: LoadingController,private commonService:CommonServiceService,private http: HttpClient) {}

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'payment successful',
      message: 'Payment successful',
      buttons: ['OK'],
      
    });

    await alert.present();
  }
  ngOnInit() {
    //this.searchCities()
    console.log(this.autocompleteResults)
  }
  onInput() {
    if (this.cityName.length > 0) {
      let autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions({ input: this.cityName }, (predictions: google.maps.places.AutocompletePrediction[], status: any) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          this.autocompleteResults = predictions;
         
        }
      });
      console.log(this.autocompleteResults)
    }
    
    else {
      this.autocompleteResults = [];
    }
  }

   options = {
    "key": "rzp_live_W93qXq63hhLhjQ",
    "amount": 100,
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", 
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

pay(){

  this.rzp1 = new this.auth.nativeWindow().Razorpay(this.options);
   this.rzp1.open()
}
loac(){
  this.commonService.getLocation().subscribe((response)=>{
    console.log(response);
    this.location = response;
  })
}
alerts(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
}
// searchCities() {

//   var keyword = "nellore"
//   const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${keyword}&limit=10&offset=0&sort=name`;
//   const headers = {
//     'X-RapidAPI-Key': 'b68b12ae01mshb45f5fc5cbfad83p1c9b2djsn7153fe006cac',
//     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//   };
//   this.http.get(url, { headers }).subscribe((data: any) => {
//     this.cities = data.data.map((city: { name: any; }) => city.name);
//   });
// }
}
