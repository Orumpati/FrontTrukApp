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



import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
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
  image:any
  autocompleteResults: google.maps.places.AutocompletePrediction[] = [];
  constructor(private auth:AuthpaymentService,  private firestore: Firestore,
    private storage: Storage,private modal:ModalController,private alert:AlertController,public loadingController: LoadingController,private commonService:CommonServiceService,private http: HttpClient) {}

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


async takePicture() {
  try {
    if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
    const image = await Camera.getPhoto({
      quality: 90,
      // allowEditing: false,
      source: CameraSource.Prompt,
      width: 600,
      resultType: CameraResultType.DataUrl
    });
    console.log('image: ', image);
    this.image = image.dataUrl;
    const blob = this.dataURLtoBlob(image.dataUrl);
    const url = await this.uploadImage(blob, image);
    console.log(url);
    const response = await this.addDocument('test', { imageUrl: url });
    console.log(response);
  } catch(e) {
    console.log(e);
  }
}

dataURLtoBlob(dataurl: any) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

async uploadImage(blob: any, imageData: any) {
  try {
    const currentDate = Date.now();
    const filePath = `test/${currentDate}.${imageData.format}`;
    const fileRef = ref(this.storage, filePath);
    const task = await uploadBytes(fileRef, blob);
    console.log('task: ', task);
    const url = getDownloadURL(fileRef);
    return url;
  } catch(e) {
    throw(e);
  }    
}

addDocument(path: any, data: any) {
  const dataRef = collection(this.firestore, path);
  return addDoc(dataRef, data);
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
