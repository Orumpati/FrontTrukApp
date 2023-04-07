import { Component, OnInit,NgZone,  ViewChild, AfterViewInit} from '@angular/core';
import  firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';
var config = {
  apiKey: "AIzaSyDM4C1YRZ14Lx_8NzbDnChklv9VInrgUmw",
  authDomain: "otplogin-c4da2.firebaseapp.com",
  projectId: "otplogin-c4da2",
  storageBucket: "otplogin-c4da2.appspot.com",
  messagingSenderId: "783500853422",
  appId: "1:783500853422:web:9b813df9ba59a87c31ad3f",
  measurementId: "G-69272HMPPD"
}
declare var google:any;
@Component({
  selector: 'app-load-tracking',
  templateUrl: './load-tracking.page.html',
  styleUrls: ['./load-tracking.page.scss'],
})
export class LoadTrackingPage implements AfterViewInit {

  @ViewChild('map', { static: false }) mapElement: any;
  getload: any;
  reCaptchaVerifier!: any;
  Distance:any;
  Dur:any;
  autocomplete: { input: string; };
  autocompleteItems: any[];

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  GoogleAutocomplete: any;
  constructor(private ngZone: NgZone,private router:Router) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    firebase.initializeApp(config);
    this.getload=JSON.parse(localStorage.getItem('selectedLoad') || '{}')
    console.log(this.getload)
    this.calculateAndDisplayRoute()
  }
  ngAfterViewInit(): void {
    this.loadMapWithDirection();
  }


  loadMapWithDirection() {

    const map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
      });
    this.directionsRenderer.setMap(map);
  }
//this is a main function
calculateAndDisplayRoute() {
  this.directionsService.route(
    {
      origin: {
        //this.Originlocation
        query: this.getload.OriginLocation,
      },
      destination: {
        //this.destination location
        query: this.getload.DestinationLocation,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response: any, status: string) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
        console.log(response.routes)
        var dist = response.routes;
        for (let i = 0; i < dist.length; i++) {
           this.Distance = dist[i].legs[i].distance.text
           this.Dur = dist[i].legs[i].duration.text
          console.log(this.Distance)
          console.log(this.Dur)
        }
      }
      else {
        window.alert('Directions request failed dut to ' + status);
      }
    })}


    endtrip(){
    if(confirm('Trip is End ,Verify Otp From Shipper')){
      this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
        }
      );
      console.log(this.reCaptchaVerifier);
    
      
      firebase
        .auth()
        .signInWithPhoneNumber( '+91' + this.getload.Number, this.reCaptchaVerifier)
        .then((confirmationResult:any) => {
          localStorage.setItem(
            'verificationId',
            JSON.stringify(confirmationResult.verificationId)
          );
          localStorage.setItem(
            'Number',
            JSON.stringify(this.getload.Number)
          );
          //localStorage.setItem('regdata',JSON.stringify(result))
         // loading.dismiss();
            this.ngZone.run(() => {
              this.router.navigate(['/end-otp']);
            });
          
        
        })
        .catch((error:any) => {
         // loading.dismiss()
          console.log(error.message);
          alert(error.message);
       
        });
    }
  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
