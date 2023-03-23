import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var google :any;
@Component({
  selector: 'app-attach-prefferd-newload',
  templateUrl: './attach-prefferd-newload.page.html',
  styleUrls: ['./attach-prefferd-newload.page.scss'],
})
export class AttachPrefferdNewloadPage implements OnInit {

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
  state:any;
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

  Items: any;
  data: any;
  regdata: any;
  veh: any;
  pickupPincode: any;
  dropupPincode: any;
  pickup: any;
  dropup: any;
  slideOpts = {
    
  };
  paymentTypeForOffline: any;
  advance: any;
  isTrukOpenOrClose: any;
  objId: any;


  constructor(
    public zone: NgZone, private alertController: AlertController,public loadingController: LoadingController,private router :Router,
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
  /* for(let i=0;i<this.post.selectedItems.length;i++){
    this.veh = this.post.selectedItems[i]
   }*/
    console.log(this.post)
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

  GetDestinationLocation(data: any) {
    this.IsDestination = true;
    this.IsOrigin = false;
    console.log(data)
    this.UpdateSearchResults(data);

  }


  UpdateSearchResults(data: any) {
    console.log(data)
    this.autocomplete.input = data;
    console.log("UpdateSearchResults")
    if (this.autocomplete.input == '') {

      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
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
    } else {
      this.dropup = 'Invalid Pincode';
    }
  }

  async sendData() {
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
      Number: this.regdata.mobileNo,
      date: this.date,
      product: this.product,
      Quantity: this.Quantity+ this.QuantityType,
      vehicle: this.vehicle,
      loadCapacity: this.loadCapacity,
      expectedPrice: this.expectedPrice,
      data: this.data,
      isTrukOpenOrClose:this.isTrukOpenOrClose,
      typeOfPay: this.typeOfPay,
      paymentTypeForOffline:this.paymentTypeForOffline,
      advance:this.advance,
      length: this.length,
      breadth: this.breadth,
      height: this.height,
      comments: this.comments,
      trukname:this.post.trukname,
      trukcapacity:this.post.trukcapacity,
      trukcurrentLocation:this.post.trukcurrentLocation,
      trukoperatingRoutes:this.post.trukoperatingRoutes,
      trukvehiclenumber:this.post.trukvehiclenumber,
      trukOwnerNumber:this.regdata.mobileNo,
    }
    console.log(body)
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
        for(let i=0;i<result.length;i++){
          this.objId =result[i]._id
        }
        if(result.status == 'success'){
          loading.dismiss()
          const alert = await this.alertController.create({
            header: 'Successfull',
            message: 'Load posted Successfully',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  console.log('Confirm Okay');
                  //you can write your code or redirection 
                  // sample redirection code 
                 this.router.navigate(['tab/tab4'])
  
                }
              }
            ],
          });
          window.location.href = '/tab/tab4';
          await alert.present();
      

      }else{
        loading.dismiss()
        alert('No providers available')

      }
      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
     // }else{
       // alert('Verify Aadhar/GST')
      //  window.location.href='/profle'
     // }


  }

  async Sendloadtovehicle() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      _id:this.post._id,
       
    loadids:this.objId._id
     
    }
    console.log(data)
    //localStorage.setItem("newpostAdd", JSON.stringify(data));

   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/addloadtotruck", {
      method: 'post',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then(response => response.json())
      .then(async result => {
        console.log(result),
          this.Items = result
          loading.dismiss()
          const alert = await this.alertController.create({
            header: 'Successfull',
            // subHeader: 'Important message',
           // message: 'truk  Successfully',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  console.log('Confirm Okay');
                  //you can write your code or redirection 
                  // sample redirection code 
                   window.location.href = '/tab/tab4';
                }
              }
            ],
          });
  
          await alert.present();
       

      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }

  slidePrev() {
    this.slides.slidePrev();
  }

  slideNext() {
    this.slides.slideNext();
  }

}
