import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  FormGroup, Validators,FormControl } from '@angular/forms';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LoadingController ,NavController} from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';
import { DatePipe } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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

  routes:any

  dropdownList: any[] = [];
  
  dropdownSettings!: IDropdownSettings;


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

  signupReferalCode:any

  OriginLocation: any;
  DestinationLocation: any;
  IsOrigin=false;
  referralCode: any;
  docId: any;
  ref: any;
  sai: any;
  OrderTime: any;
  currenttime:any;
  finals: any;

  constructor(private router:Router,private uniqueDeviceID: UniqueDeviceID,public loadingController: LoadingController,public navController:NavController,private commonService:CommonServiceService,public zone:NgZone,private datepipe:DatePipe) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

  ngOnInit() {
    this.OrderTime =this.datepipe.transform((new Date), 'MM/dd/yyyy ');
    this.currenttime =this.datepipe.transform((new Date), ' h:mm:ss');
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
    'signupReferalCode':new FormControl('',[Validators.required])
  });

  console.log(this.signupForm.value.mobileNo)


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
    'West Bengal'
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


    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // this.referralCode = '';
    // for (let i = 0; i < 6; i++) {
    //   this.referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    // }
    // console.log(this.referralCode)

    // Combine the user's name and referral code
    this.referralCode = data.firstName.toUpperCase().slice(0, 2)+data.lastName.toUpperCase().slice(0, 2) + String(data.mobileNo).slice(0, 4);
alert(this.referralCode)

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
   aboutCompany:this.aboutCompany,
   referalCode:this.referralCode,
   signupReferalCode:data.signupReferalCode,
   SignupDate:this.OrderTime +''+this.currenttime
}
 console.log(this.final)

if(data.signupReferalCode == null || data.signupReferalCode == '' || data.signupReferalCode == undefined){
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
            window.location.href='/loginotp'
            this.navController.navigateForward('/loginotp');
          }
     
          else if(result.status == "failed" ){
            loading.dismiss();
            alert("Already registered please login")
            //this.router.navigate(['/loginotp'])
            window.location.href='/loginotp'
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

          }else {

            var ss={
              referalCode:data.signupReferalCode
            }
            fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/refferedBy", {
                
            method:'post',
            headers:{
                      "Access-Control-Allow-Origin": "*",
                        "Content-Type":'application/json'
                    },
            body:JSON.stringify(ss),
            }).then(res => res.json())
            
            .then(
              async result =>{
          console.log(result)
          this.sai =result.ref
          this.docId=result._id
  
   

          if(result.status == 'success'){
            this.finals ={
  
              firstName:data.firstName,
               lastName:data.lastName,
               mobileNo:data.mobileNo,
               city:data.city,
               companyName:data.companyName,
              role:this.role,
               uniqueDeviceId:this.UniqueDeviceID,
               routes:data.routes,
               aboutCompany:this.aboutCompany,
               referalCode:this.referralCode,
               signupReferalCode:data.signupReferalCode,
               SignupDate:this.OrderTime +''+this.currenttime,
               TotalCoins:100,
               PermanetCoins:100
            }

            fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/signup", {
      
            method:'post',
            headers:{
                      "Access-Control-Allow-Origin": "*",
                        "Content-Type":'application/json'
                    },
            body:JSON.stringify(this.finals),
            }).then(res => res.json())
            
            .then(
              result =>{
      
                if(result.status == "success"){
                  loading.dismiss();
                  localStorage.setItem('Number',this.final.mobileNo)
                  this.referedusersigned(data.firstName,data.lastName,data.mobileNo,this.docId)
                  this.addcoinstoRefered(data.signupReferalCode)
                  alert('Your account is registered')
                 
                  window.location.href='/loginotp'
                  this.navController.navigateForward('/loginotp');
                }
           
                else if(result.status == "failed" ){
                  loading.dismiss();
                  alert("Already registered please login")
                  //this.router.navigate(['/loginotp'])
                  window.location.href='/loginotp'
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
    
          }else{
            alert('Invalid Referal code')
            loading.dismiss();
          }
        })
  }

}

referedusersigned(firstName:any,lastName:any,mobileNo:any,docId:any){
  var data ={
    _id:docId,
    firstName:firstName,
    lastName:lastName,
    mobileNo:mobileNo
  }
  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/refereduserdata", {
      
  method:'post',
  headers:{
            "Access-Control-Allow-Origin": "*",
              "Content-Type":'application/json'
          },
  body:JSON.stringify(data),
  }).then(res => res.json())
  
  .then(
    result =>{
console.log(result)
  
    }
    ).catch(
        error =>{
      
         console.log(error)
         
        });
}






addcoinstoRefered(signupReferalCode:any){
  var data ={
    referalCode:signupReferalCode
  
  }
  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/addcoinstoRefered", {
      
  method:'post',
  headers:{
            "Access-Control-Allow-Origin": "*",
              "Content-Type":'application/json'
          },
  body:JSON.stringify(data),
  }).then(res => res.json())
  
  .then(
    result =>{
console.log(result)
  
    }
    ).catch(
        error =>{
      
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
