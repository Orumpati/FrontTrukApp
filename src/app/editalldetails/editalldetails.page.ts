import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-editalldetails',
  templateUrl: './editalldetails.page.html',
  styleUrls: ['./editalldetails.page.scss'],
})
export class EditalldetailsPage implements OnInit {
  detailsforEdit:any
  routeDetails:any
  logindata: any;
  profile: any;
  constructor(private route: ActivatedRoute, private fb : FormBuilder,private router:Router,public loadingController: LoadingController) { }
  mobileNo:any
  
  firstName :any
  lastName:  any
  role:  any
  city: any
  companyName:  any

 // updatedFormed!:FormGroup

  addressType: any
  doorNo:  any
  areaName: any
  landMark: any
  
  pincode: any

 // routes:any=[]

  ngOnInit() {
   //this.detailsforEdit=JSON.parse( localStorage.getItem('detailsforEdit') || "{}")
   this.logindata=JSON.parse( localStorage.getItem('regdata') || "{}")
   //console.log(this.logindata)
   this.get()
  /* for(let i=0;i<this.detailsforEdit.routes.length;i++){
      this.routeDetails=this.detailsforEdit.routes[i]
   }
   console.log(this.detailsforEdit)

   console.log(this.detailsforEdit['firstName'])*/
  
   //this.updatedFormed.setValue({firstName: this.profile.firstName});
   //this.updatedFormed.value.firstName =this.profile.firstName
  }
  updatedFormed = new FormGroup({
    mobileNo :new FormControl(''),
    firstName:new FormControl(''),
    lastName: new FormControl(''),
    role:new FormControl(''),
     city:new FormControl(''),
     companyName:new FormControl(''),
     addressType:new FormControl(''),
     doorNo:new FormControl(''),
     areaName:new FormControl(''),
     landMark:new FormControl(''),
     pincode:new FormControl(''),
     routes:new FormControl('')

   })
  async get() {
    const loading = await this.loadingController.create({
      //message: 'Loading...',
      spinner: 'lines'
    });
    await loading.present();
    var data ={
      mobileNo: this.logindata.mobileNo
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/login/loginDetails", {
      method: 'POST',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body:JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
          this.profile = result.data 
          this.updatedFormed = new FormGroup({
            mobileNo :new FormControl(this.profile.mobileNo),
            firstName:new FormControl(this.profile.firstName),
            lastName: new FormControl(this.profile.lastName),
            role:new FormControl(this.profile.role),
             city:new FormControl(this.profile.city),
             companyName:new FormControl(this.profile.companyName),
             addressType:new FormControl(this.profile.addressType),
             doorNo:new FormControl(this.profile.doorNo),
             areaName:new FormControl(this.profile.areaName),
             landMark:new FormControl(this.profile.landMark),
             pincode:new FormControl(this.profile.pincode),
             routes:new FormControl(this.profile.routes)
        
           })

           
        loading.dismiss()
      }

      ).catch(err =>{
loading.dismiss()
        console.log(err)})
  }

  async saveDetails(data:any){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    console.log(data)
    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/updateprofile/" +this.profile._id, {
      
    method:'put',
    headers:{
              "Access-Control-Allow-Origin": "*",
                "Content-Type":'application/json'
            },
    body:JSON.stringify(data),
    }).then(res => res.json())
    
    .then(
      result =>{
   console.log(result)
  //console.log(this.detailsforEdit['firstName']=result.firstName)
  this.detailsforEdit['firstName']=result.firstName
         this.detailsforEdit['lastName']=result.lastName
         this.detailsforEdit['mobileNo']=result.mobileNo
         this.detailsforEdit['role']=result.role
         this.detailsforEdit['city']=result.city
         this.detailsforEdit['companyName']=result.companyName
         this.detailsforEdit['addressType']=result.addressType
         this.detailsforEdit['doorNo']=result.doorNo
         this.detailsforEdit['areaName']=result.areaName
         this.detailsforEdit['landMark']=result.landMark
         this.detailsforEdit['aadharVerify']=result.aadharVerify
         this.detailsforEdit['gstVerify']=result.gstVerify
         this.detailsforEdit['routes']=result.routes

         localStorage.setItem('regdata',JSON.stringify(this.detailsforEdit))
      loading.dismiss()
      alert('Saved Successfully')
      window.location.href="/profile"
      this.router.navigate(['profile'])
      
    
      }
      ).catch(
          error =>{
            loading.dismiss()
            //alert('unable update Data');
           console.log(error)
          });
        
  
  }
goback(){
  window.location.href="/profile"
this.router.navigate(['profile'])
}
}
