import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  FormGroup, Validators,FormControl } from '@angular/forms';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LoadingController ,NavController} from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';
declare var google :any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!:FormGroup 
  allDetails:any
  role:any
  UniqueDeviceID!:string;
  final: any;
  aboutCompany:any
  location: any;


  @ViewChild('map', { static: false }) mapElement: any;
  


  map: any;
  address: any;
  lat: any;
  long: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
 // location: any;
  placeid: any;
  GoogleAutocomplete: any;



  OriginLocation: any;
  DestinationLocation: any;
  IsOrigin=false;

  constructor(private router:Router,private uniqueDeviceID: UniqueDeviceID,public loadingController: LoadingController,public navController:NavController,private commonService:CommonServiceService,public zone:NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

  ngOnInit() {
    
    this.getUniqueDeviceID();
   this.role = JSON.parse(localStorage.getItem('selectType') || '{}')
   var lang= JSON.parse(localStorage.getItem('language') || '{}') 
    this.allDetails =JSON.parse(localStorage.getItem('allDetails') || '{}') 
  
console.log(this.allDetails)

   this.signupForm= new FormGroup ({
    'firstName': new FormControl('', [Validators.required]),
    'lastName': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required]),
    'companyName': new FormControl('', [Validators.required]),
    'routes': new FormControl('', [Validators.required]),
    mobileNo: new FormControl( '' ,[Validators.required ]),
    'aboutCompany': new FormControl('', [Validators.required]),
  });

  console.log(this.signupForm.value.mobileNo)
  }

  GetOriginLocation(data: any) {
    this.IsOrigin = true;
    //this.IsDestination = false;
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
  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        this.UniqueDeviceID = uuid;

        //alert(this.UniqueDeviceID)
      })
      .catch((error: any) => {
        console.log(error);
        this.UniqueDeviceID = "Error! ${error}";
      });
  }

  async onSubmit(data:any){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    
console.log(data)

 this.final ={
  
  firstName:data.firstName,
   lastName:data.lastName,
   mobileNo:data.mobileNo,
   city:data.city,
   companyName:data.companyName,
  role:this.role,
   uniqueDeviceId:this.UniqueDeviceID,
   routes:data.routes,
   aboutCompany:this.aboutCompany
}
 console.log(this.final)

    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/signup", {
      
      method:'post',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      body:JSON.stringify(this.final),
      }).then(res => res.json())
      
      .then(
        result =>{

          if(result.status == "success"){
            loading.dismiss();
            localStorage.setItem('Number',this.final.mobileNo)
            alert('Your account is registered')
            this.navController.navigateForward('/loginotp');
          }
     
          else if(result.status == "failed" ){
            loading.dismiss();
            alert("Already registered please login")
            //this.router.navigate(['/loginotp'])
            this.navController.navigateForward('/loginotp');
            }else if(result.status == "faileds"){
              loading.dismiss();
              alert('Unable to Signup')
            }
       
        
        
      
        }
        ).catch(
            error =>{
              loading.dismiss();
              alert('register not  successfull');
             console.log(error)
             
            });

  
  }

  loac(){
    this.commonService.getLocation().subscribe((response)=>{
      console.log(response);
      this.location = response;
    })
  }

}
