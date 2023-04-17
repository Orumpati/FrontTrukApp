import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
declare var google :any;
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-attach-new-load',
  templateUrl: './attach-new-load.page.html',
  styleUrls: ['./attach-new-load.page.scss'],
})
export class AttachNewLoadPage implements OnInit {
  @ViewChild(IonSlides)
  slides!: IonSlides;
  @ViewChild('map', { static: false }) mapElement: any;
  tonnes: any;
  product: any;
  date: any;
  Quantity: any;
  Number: any;
  vehicle: any;
  loadCapacity: any;
  expectedPrice: any;
  typeOfPay: any;
  comments: any;
  length: any;
  breadth: any;
  height: any;
  
  dropupState:any
  QuantityType:any
  map: any;
  address: any;
  lat: any;
  long: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  checkbox=false


  trukname:any;
  trukvehiclenumber:any;
  trukcurrentLocation:any;
  trukoperatingRoutes:any;
  trukcapacity:any;


  OriginLocation: any;
  DestinationLocation: any;
  IsOrigin = false;
  IsDestination = false;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  objects: any;
  post: any;
  slideOpts = {
    
  };
  Items: any;
  data: any;
  regdata: any;
  pickupState: any;
  
  pickupPincode: any;
  dropupPincode: any;
  pickup: any;
  dropup: any;
  isTrukOpenOrClose:any
  paymentTypeForOffline: any;
  advance: any;

  typeofTanker:any;
  typeOfHyva:any
  typeOfTrailer:any
  typeOfContainer:any
  randomNumber: any;
  pickupDis: any;
  dropupDis: any;
  constructor(
    public zone: NgZone, private alertController: AlertController,public loadingController: LoadingController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }
  ngOnInit(): void {
    this.regdata =JSON.parse(localStorage.getItem('regdata') || '{}')

    this.objects = localStorage.getItem("AttachNewLoad");  //use the localstorage we getdata from savedData
    //The localStorage object allows you to save key/value pairs in the browser.
    this.post = JSON.parse(this.objects)  //parse() The JSON. parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

    console.log(this.objects)
console.log(this.typeOfPay)
this.randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
console.log(this.randomNumber)
  }

 /* ngAfterViewInit(): void {
    this.loadMapWithDirection();
  }*/





  loadMapWithDirection() {

    const map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
      });
    this.directionsRenderer.setMap(map);
  }


  //Get origin and destination location 

  GetOriginLocation(data: any) {
    this.IsOrigin = true;
    this.IsDestination = false;
    console.log(data)
    this.UpdateSearchResults(data);

    // console.log(this.DestinationLocation)

  }

  out(data: any) {
    console.log(data)
    this.data = data
  }

  truk(isTrukOpenOrClose: any) {
    console.log(isTrukOpenOrClose)
    this.isTrukOpenOrClose = isTrukOpenOrClose
  }

  HYVA(typeOfHyva: any) {
    console.log(typeOfHyva)
    this.typeOfHyva = typeOfHyva
  }

  trailer(typeOfTrailer: any) {
    console.log(typeOfTrailer)
    this.typeOfTrailer = typeOfTrailer
  }

  container(typeOfContainer: any) {
    console.log(typeOfContainer)
    this.typeOfContainer = typeOfContainer
  }
  Tanker(typeofTanker: any) {
    console.log(typeofTanker)
    this.typeofTanker = typeofTanker
  }

  GetDestinationLocation(data: any) {
    this.IsDestination = true;
    this.IsOrigin = false;
    console.log(data)
    this.UpdateSearchResults(data);

  }


  UpdateSearchResults(data: any) {
    var options = {
      types: ['(cities)'],
      //componentRestrictions: {country: "ind"}
     };
    console.log(data)
    this.autocomplete.input = data;
    console.log("UpdateSearchResults")
    if (this.autocomplete.input == '') {

      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input,options },
      (predictions: any[], status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            console.log('places' + prediction)
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  //this is a main function
  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: {
          //this.Originlocation
          query: this.OriginLocation,
        },
        destination: {
          //this.destination location
          query: this.DestinationLocation,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
        }
        else {
          window.alert('Directions request failed dut to ' + status);
        }
      }
    );
  }
  //wE CALL THIS FROM EACH ITEM.
  SelectSearchResult(item: { place_id: any; description: any }) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    //alert(JSON.stringify(item))   
    console.log(item.description)
    this.placeid = item.description;


    if (this.IsOrigin) {
      this.OriginLocation = item.description;
      this.autocompleteItems = [];
    }
    else if (this.IsDestination) {
      this.DestinationLocation = item.description;
      this.autocompleteItems = [];
    }
  }

  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  ClearAutocomplete() {
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }
  async getPickupState() {
    const url = `https://api.postalpincode.in/pincode/${this.pickupPincode}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (data[0].Status === 'Success') {
      const postOffice = data[0].PostOffice[0];
      this.pickup = `${postOffice.State}`;
      this.pickupDis = `${postOffice.District}`;
    } else {
      this.pickup = 'Invalid Pincode';
   
    }
   
  }

  async getDropupState() {
    const url = `https://api.postalpincode.in/pincode/${this.dropupPincode}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (data[0].Status === 'Success') {
      const postOffice = data[0].PostOffice[0];
      this.dropup = `${postOffice.State}`;
      this.dropupDis = `${postOffice.District}`;
    } else {
      this.dropup = 'Invalid Pincode';
     // alert("Invalid DropUp Pincode")
    }
    
  }
gf(){
  if(this.typeOfPay == "Online"){
    this.paymentTypeForOffline =''
    this.advance =''

  }
}
  async sendData() {
    if(this.typeOfPay == "Online"){
      this.paymentTypeForOffline =''
      this.advance =''

    }
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var body = {
      DestinationLocation: this.DestinationLocation,
      OriginLocation: this.OriginLocation,
      dropupState:this.dropup,
      pickupState: this.pickup,
      Number: String(this.regdata.mobileNo),
      date: this.date,
      product: this.product,
      paymentTypeForOffline:this.paymentTypeForOffline,
      advance:this.advance,
      Quantity: this.Quantity + this.QuantityType,
      vehicle: this.vehicle,
      loadCapacity: this.loadCapacity,
      expectedPrice: this.expectedPrice,
      data: this.data,
      isTrukOpenOrClose:this.isTrukOpenOrClose,
      typeOfPay: this.typeOfPay,
      typeOfHyva:this.typeOfHyva,
      typeOfTrailer:this.typeOfTrailer,
      typeOfContainer:this.typeOfContainer,
      typeofTanker:this.typeofTanker,
      LoadId:this.randomNumber,
   /*    length: this.length,
      breadth: this.breadth,
      height: this.height, */
      comments: this.comments,
      LoadPosterName:this.regdata.firstName + this.regdata.lastName,
      mess:"Posted a Load"
    }
    console.log(body)
    if(body.pickupState == 'Invalid Pincode'|| body.dropupState == 'Invalid Pincode'){
  alert("Pincode is Invalid")
  loading.dismiss()
    }else{
   // if(this.regdata.aadharVerify === 'Verified' || this.regdata.gstVerify === 'Verified'){
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/generateQuote", {
      method: 'post',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),

    })
      .then(response => response.json())
      .then(async result => {
        console.log(result)
        this.Items = result
        loading.dismiss()
        if(result.status === 'failed'){
          loading.dismiss()
       alert('No provides Available')

      }else{
        loading.dismiss()
      alert('Load Posted Successfully')

      }
      }

      ).catch(err =>{
        loading.dismiss()
        alert('Load Not Posted')
        console.log(err)
      })
    }
     // }else{
       // alert('Verify Aadhar/GST')
      //  window.location.href='/profle'
     // }


  }

  slidePrev() {
    this.slides.slidePrev();
  }

  slideNext() {
    this.slides.slideNext();
  }
}
