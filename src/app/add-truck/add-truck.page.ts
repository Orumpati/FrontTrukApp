import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.page.html',
  styleUrls: ['./add-truck.page.scss'],
})
export class AddTruckPage implements OnInit {

  toppings: any;
  trukname: any;
  trukoperatingRoutes: any = [];
  dropdownList: any[] = [];
  
  dropdownSettings!: IDropdownSettings;
  trukvehiclenumber: any;
  trukcurrentLocation: any;
  trukcapacity: any;
  Items: any;
  trukdate: any;

  trukOwnerNumber:any
  logindata: any;
  isTrukOpenOrClose: any;


  map: any;
  address: any;
  lat: any;
  long: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;


 IsOrigin=false;
  OriginLocation: any;
  DestinationLocation: any;

  @ViewChild('map', { static: false }) mapElement: any;
  typeOfHyva: any;
  typeOfTrailer: any;
  typeOfContainer: any;
  typeofTanker:any;
  

  constructor(private alertController: AlertController,public loadingController: LoadingController,public zone:NgZone) { 

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    this.dropdownList = [
      'Andhra Pradesh', 
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Odisha',
      'Nagaland',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
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


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  out(trukname: any) {
    console.log(trukname)

    this.trukname = trukname
    console.log(this.trukname)

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
  Tanker(typeofTanker:any){
    
    this.typeofTanker = typeofTanker
  }


  //Get origin and destination location 

  GetOriginLocation(data: any) {
    this.IsOrigin = true;
   
    console.log(data)
    this.UpdateSearchResults(data);

    // console.log(this.DestinationLocation)

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
   
  }

   //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
   ClearAutocomplete() {
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

  async postVehile() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var body = {
      trukvehiclenumber: this.trukvehiclenumber,
      trukcapacity: this.trukcapacity,
      OriginLocation: this.OriginLocation,
      trukoperatingRoutes: this.trukoperatingRoutes,
      trukname: this.trukname,
      trukdate: this.trukdate,
      trukOwnerNumber:this.logindata.mobileNo,
      isTrukOpenOrClose:this.isTrukOpenOrClose,
     
      typeOfHyva:this.typeOfHyva,
      typeOfTrailer:this.typeOfTrailer,
      typeOfContainer:this.typeOfContainer,
      typeofTanker:this.typeofTanker
    }
    console.log()
    fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/vehiclepost", {
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
        const alert = await this.alertController.create({
          header: 'Successfull',
          // subHeader: 'Important message',
          message: 'truk posted Successfully',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
                //you can write your code or redirection 
                // sample redirection code 
                window.location.href = '/your-truck-posted';

              }
            }
          ],
        });

        await alert.present();


      }

      ).catch(err =>
        console.log(err))
        loading.dismiss()
  }
}