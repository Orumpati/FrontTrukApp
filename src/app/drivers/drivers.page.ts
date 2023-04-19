import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  images: any;
  logindata: any;
  drivers: any;
  driver: any;
  filtered: any;
Availability = false
flag : any = false;
  DocId: any;
  trukDocId: any;
  location: any;
  driv: any;


  constructor(private loadingController:LoadingController) { }



  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata')||'{}')
    this.DocId =JSON.parse(localStorage.getItem('loadItemOnline') || '{}')
    this.trukDocId = JSON.parse(localStorage.getItem('loadDocId') || '{}')
    this.location =JSON.parse(localStorage.getItem('locatioPath') || '{}')
    this.toggle()

  }
  async getDetails(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
   // console.log(data)
    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/getprofiledetails/" +this.logindata.Authentication, {
      
    method:'get',
    headers:{
              "Access-Control-Allow-Origin": "*",
                //"Content-Type":'application/json'
            },
    //body:JSON.stringify(data),
    }).then(res => res.json())
    
    .then(
      result =>{
   console.log(result)
   
   for(let i=0;i<result.data.length;i++){
    this.driv=result.data[i].Drivers
   }
   this.driver = this.driv.filter((data:any)=>{
    return data.Availability == true
   })
  //console.log(this.detailsforEdit['firstName']=result.firstName)

      loading.dismiss()
     // window.location.href="/profile"
     // this.router.navigate(['profile'])
      
    
      }
      ).catch(
          error =>{
            loading.dismiss()
            //alert('unable update Data');
           console.log(error)
          });
        
  
  }
  async toggle(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/getprofiledetails/" +this.logindata.Authentication, {
      
    method:'get',
    headers:{
              "Access-Control-Allow-Origin": "*",
                //"Content-Type":'application/json'
            },
    //body:JSON.stringify(data),
    }).then(res => res.json())
    
    .then(
      result =>{
   console.log(result)

   for(let i=0;i<result.data.length;i++){
    this.drivers =result.data[i].Drivers
   }
   this.driver = this.drivers.filter((data:any)=>{
    return data.Availability == false
   })
   loading.dismiss()
    console.log(this.driver)
      }
      ).catch(
          error =>{
            loading.dismiss()
            //alert('unable update Data');
           console.log(error)
          });
        
  }




  

/*  async ChangeAvailable(data:any){
console.log(data.Availability)
if(data.Availability == true){
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  var body ={
    _id :this.logindata.Authentication,
    DriverNumber:data.DriverNumber,
    Availability:true
  }
  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/updateAvailability", {
      
  method:'post',
  headers:{
            "Access-Control-Allow-Origin": "*",
              "Content-Type":'application/json'
          },
  body:JSON.stringify(body),
  }).then(res => res.json())
  
  .then(
    result =>{
      loading.dismiss()
 console.log(result)
    }
    ).catch(
        error =>{
          loading.dismiss()
          //alert('unable update Data');
         console.log(error)
        });
  }else{
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var body ={
      _id :this.logindata.Authentication,
      DriverNumber:data.DriverNumber,
      Availability:false
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/updateAvailability", {
        
    method:'post',
    headers:{
              "Access-Control-Allow-Origin": "*",
                "Content-Type":'application/json'
            },
    body:JSON.stringify(body),
    }).then(res => res.json())
    
    .then(
      result =>{
        loading.dismiss()
   console.log(result)
      }
      ).catch(
          error =>{
            loading.dismiss()
            //alert('unable update Data');
           console.log(error)
          });
  }
} */

 async NewPostAdd(driver:any) {
console.log(driver)
if(confirm("Are You Sure")){
  const loading = await this.loadingController.create({
     message: 'Loading...',
     spinner: 'crescent'
   });
   await loading.present();
   var data = {
     _id:this.DocId, 
     vehicleType: driver.TrukType,
     vehicleNo: driver.TrukNumber,

     DriverName: driver.DriverName,
     DriverNumber: driver.DriverNumber,
     shareContact:true,


    


   }
   console.log(data)
   

   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/attachVehicleToLoad", {
     method: 'post',
     headers: {
       "Access-Control-Allow-Origin": "*",
       "Content-Type": 'application/json'
     },
     body: JSON.stringify(data),

   })
     .then(response => response.json())
     .then(result => {
       console.log(result),
        // this.Items = result  
         this.isactiveComplete() 
        this.OntripStatus(driver.DriverNumber)  
       loading.dismiss()
       alert("Posted Successfully")
window.location.href="/place-bid"
     }

     ).catch(err =>{
       
       console.log(err)
       loading.dismiss()
     })
 }
} 
 async NewPostAddOnline(driver:any) {
if(confirm('Are you Sure')){
  const loading = await this.loadingController.create({
     message: 'Loading...',
     spinner: 'crescent'
   });
   await loading.present();
   var data = {
     _id:this.DocId, 
    // vehicleType: driver.TrukType,
     //vehicleNo: driver.TrukNumber,

     DriverName: driver.DriverName,
     DriverNumber: driver.DriverNumber,
     shareContact:true,
     DriverStatus:"Active"

     /*transporterName:this.transporterName,
     companyName:this.companyName,
     mobileNumber:this.mobileNumber,
     city:this.city,*/
    


   }
   console.log(data)
   //localStorage.setItem("newpostAdd", JSON.stringify(data));

   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/attachVehicleToLoad", {
     method: 'post',
     headers: {
       "Access-Control-Allow-Origin": "*",
       "Content-Type": 'application/json'
     },
     body: JSON.stringify(data),

   })
     .then(response => response.json())
     .then(result => {
       console.log(result),
        // this.Items = result  
        // this.isactiveComplete()   
       loading.dismiss()
       alert("Posted Successfully")
       this.isactiveComplete()
       this.OntripStatus(driver.DriverNumber)
      window.location.href="/truckviewbids"
     }

     ).catch(err =>{
       
       console.log(err)
       loading.dismiss()
     })
    }
 }
 async isactiveComplete() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent'
  });
  await loading.present();
  
  var data = {
    trukisActive: "InProgress" //load ni inprgress chesthunamm
  }
  // console.log(data)


  fetch("https://amused-crow-cowboy-hat.cyclic.app/addTruk/TrukDeactive/" + this.trukDocId, {
    method: 'PUT',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),

       // this.products = JSON.parse(result)  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions

loading.dismiss()
      //window.location.reload()  // reloading window

    }

    ).catch(err =>{
      loading.dismiss()
      console.log(err)
    })
}


OntripStatus(data:any){
  var body ={
    _id :this.logindata.Authentication,
    DriverNumber:data,
    Availability:false
  }
  fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/updateAvailability", {
      
  method:'post',
  headers:{
            "Access-Control-Allow-Origin": "*",
              "Content-Type":'application/json'
          },
  body:JSON.stringify(body),
  }).then(res => res.json())
  
  .then(
    result =>{
      //loading.dismiss()
 console.log(result)
    }
    ).catch(
        error =>{
          //loading.dismiss()
          //alert('unable update Data');
         console.log(error)
        });
}

autorefresh(event:any){
    
  setTimeout(() => {
    event.target.complete()
    //window.location.href="tab/tab1"
   window.location.reload()
  }, 2000);
}

}
