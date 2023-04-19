import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import{ActionSheetController, LoadingController, ModalController,PopoverController}from '@ionic/angular'
import { Router, NavigationExtras } from '@angular/router';
import {  CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { Crop } from '@ionic-native/crop/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@awesome-cordova-plugins/file/ngx';



import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
logindata:any
boss!:boolean
otp:any
  dropdownList:any[]= [];
 selectedItems:any= [];
 dropdownSettings!: IDropdownSettings;
 AadharNumber:any
 gstinNumber:any
 userName:any
 addressdetail:any =[]
 routes:any=[]
 passdata:any


 
 securepath: any = window;
 url: any;
  spin: boolean | undefined;
  image: any;
  constructor(private modal:ModalController,private router: Router,private actionsheet:ActionSheetController,
    private firestore: Firestore,
    private storage: Storage,private file:File,private crop:Crop,private domsanitize: DomSanitizer,public loadingController: LoadingController
    ) { }
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '45px',
      height: '45px',
    },
  };
  ngOnInit() {
    this.spin=false
  this.logindata=  JSON.parse(localStorage.getItem('regdata')|| '{}')
  console.log(this.logindata)
  console.log(this.logindata.Authentication)
  this.hide()
  this.getaddressdetails()
    this.dropdownList = [
      'Andaman and Nicobar Islands' ,
      'Andhra Pradesh' ,
       'Arunachal Pradesh' ,
     'Assam' ,
    'Bihar' ,
       'Chandigarh' ,
       'Chhattisgarh' ,
     'Dadra Nagar Haveli and Daman Diu' ,
       'Goa' ,
     'Gujarat' ,
       'Haryana' ,
        'Himachal Pradesh' ,
        'Jammu and Kashmir' ,
     'Jharkhand' ,
        'Karnataka' ,
        'Kerala' ,
        'Lakshadweep' ,
        'Ladakh' ,
        'Madhya Pradesh' ,
        'Maharashtra' ,
        'Manipur' ,
        'Meghalaya' ,
        'Mizoram' ,
        'Nagaland' ,
        'National Capital Territory (Delhi)' ,
        'Odisha' ,
        'Puducherry' ,
        'Punjab' ,
        'Rajasthan' ,
        'Tamil Nadu' ,
       'Telangana' ,
        'Tripura' ,
        'Uttar Pradesh' ,
        'Uttarakhand' ,
        'West Bengal' ,
    
    ];
    this.selectedItems = [
     
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }
  ionViewDidEnter(){
    this.getaddressdetails()
  }
  onOtpChange(otp: string) {
    this.otp = otp;
  }
  hide(){
    if(this.logindata.role === 'Shipper' || this.logindata.role === 'Fleet Owner'){
      this.boss = true
    }else{
      this.boss =false
    }
  }

  passData() {
  
    //localStorage.setItem('detailsforEdit',JSON.stringify(this.passdata))
      this.router.navigate(['editalldetails'])
  
  }
 

 
 
  

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  async verifyAadhar(){
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    
  console.log(this.AadharNumber)

    const final ={
      aadhaarNumber:this.AadharNumber,
    
    }
    console.log(final)
    fetch("https://api.emptra.com/aadhaarVerification/requestOtp",{
        //fetch("https://api.emptra.com/aadhaarVerification/requestOtp", {
          
          method:'post',
          headers:{
                    "Access-Control-Allow-Origin": "*",
                      "Content-Type":'application/json',
                      "clientId":'773901a84fd7da63fb77100ad2cefcf9:c5ba2d212af3d978c2a857062001a431',
                      "secretKey":'FEwoB08LfXN7ie8m5y1JgQL8TSj0bO6adngxGoa5Yfc4XeXd9Pe3I2VEfGh7ZAap9'
                  },
          body:JSON.stringify(final),
          }).then(res => res.json())
          
          .then(
            async result =>{
         console.log(result)
      
      
            console.log(result.result.data.client_id)
           localStorage.setItem("client_id",JSON.stringify(result.result.data.client_id))
           if(result.code == 104){
            alert("Recharge Your Wallet")
           }
loading.dismiss()
              
           
           
      const ele =await this.modal.getTop()
    if(ele){
      ele.dismiss();
      this.router.navigate(['vrifyaadharotp'])
      return;
    }
      
  
            }
            ).catch(
                error =>{
                  loading.dismiss()
            alert(error)
                 console.log(error)
                });
              
      
    }





      async verifygstin(){
        const loading = await this.loadingController.create({
          message: 'Verifying...',
          spinner: 'crescent'
        });
        await loading.present();
        /*const ele =await this.modal.getTop()
        if(ele){
          ele.dismiss();
          return;
        }*/
      console.log(this.gstinNumber)
    
        const final ={
        
          gstin:this.gstinNumber ,
          username: this.userName
        
        }
        console.log(final)
        fetch("https://api.emptra.com/gstOtp",{
            
              
              method:'post',
              headers:{
                  
                          "Content-Type":'application/json',
                          "clientId":'773901a84fd7da63fb77100ad2cefcf9:c5ba2d212af3d978c2a857062001a431',
                          "secretKey":'FEwoB08LfXN7ie8m5y1JgQL8TSj0bO6adngxGoa5Yfc4XeXd9Pe3I2VEfGh7ZAap9'
                      },
              body:JSON.stringify(final),
              }).then(res => res.json())
              
              .then(
                async result =>{
             console.log(result)
             if(result.code == 100){
              localStorage.setItem("gst",JSON.stringify(this.gstinNumber))
              localStorage.setItem("gstusername",JSON.stringify(this.userName))
              localStorage.setItem("AppKey",JSON.stringify(result.result.response.appKey))
              loading.dismiss()
                       
     const ele =await this.modal.getTop()
     if(ele){
       ele.dismiss();
      this.router.navigate(['verifygstotp'])
       return;
     }
           
             }else{
             
              alert('Please enable API request from Your GST profile')
     
    }  
                }
                ).catch(
                    error =>{
                      loading.dismiss()
                     // alert('Enter valid AadharNumber');
                     console.log(error)
                    });
                  
          
        }




       


  async getaddressdetails(){
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/getprofiledetails/" + this.logindata.Authentication, {
      
      method:'get',
      headers:{
                "Access-Control-Allow-Origin": "*",
                  "Content-Type":'application/json'
              },
      
      }).then(res => res.json())
      
      .then(
        result =>{
     
         console.log(result)
         this.addressdetail = result.data
     

         for(let i=0;i<this.addressdetail.length;i++){
         this.routes=this.addressdetail[i]
         console.log(this.routes)
         this.passdata =this.routes//store pbject into localstorage
loading.dismiss()
         console.log(this.passdata.routes)
         
         }
     
        }
        ).catch(
            error =>{
              loading.dismiss()
              //alert('unable to get address details');
             console.log(error)
            });
           
  
  }


  //addroutes
  async addroutes(){
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(this.selectedItems)
    var data ={
      routes:this.selectedItems
    
    }
    console.log(data)
    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/putroutes/" +this.logindata.Authentication, {
      
    method:'put',
    headers:{
              "Access-Control-Allow-Origin": "*",
                "Content-Type":'application/json'
            },
    body:JSON.stringify(data),
    }).then(res => res.json())
    
    .then(
      result =>{
   console.log(result.routes)
      loading.dismiss()
      
      
    
      }
      ).catch(
          error =>{
            loading.dismiss()
            alert('unable to add routes');
           console.log(error)
          });
     
  
  }
  async editphoto(){
    
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
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
  goback(){
    if(this.logindata.role == 'Shipper'){
      this.router.navigate(['tab/tab1'])
    }else{
      
      this.router.navigate(['tab/tab2'])
    }
  }
}
