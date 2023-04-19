import { Component, OnInit } from '@angular/core';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-driver-active-loads',
  templateUrl: './driver-active-loads.page.html',
  styleUrls: ['./driver-active-loads.page.scss'],
})
export class DriverActiveLoadsPage implements OnInit {
  loads: any;
  truker: any;
  driver: any;
  dri: any;
  onlydriver: any;
  Availability!:boolean
  onedriver: any;
  single: any;
  Available: any;
  constructor(private loadingController:LoadingController) { }

  ngOnInit() {
  this.truker =JSON.parse(localStorage.getItem('regdata')|| '{}')
  console.log(String(this.truker.mobileNo))
this.get()
 this. gettrukerbyload()
 
  }

  async get(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      
       
    mobileNo:String(this.truker.mobileNo),//"8008002050", //login driver number attached to the load in vehicle info
    DriverStatus:"Active"
    }
    console.log(data)
    //localStorage.setItem("newpostAdd", JSON.stringify(data));
  
   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/findloadbydrivers", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),
  
    })
      .then(response => response.json())
      .then(async result => {
        console.log(result),
          this.loads=result.data
          console.log(this.loads)
          loading.dismiss()
  
       
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }

  selectedLoad(load:any){
    console.log(load)
    localStorage.setItem('selectedLoad',JSON.stringify(load))
    
    window.location.href='/driver-more-details'
  }


  async gettrukerbyload(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      
       
    mobileNo:String(this.truker.mobileNo)
     
    }
    console.log(data)
    //localStorage.setItem("newpostAdd", JSON.stringify(data));
  
   fetch("https://amused-crow-cowboy-hat.cyclic.app/TruckAppUsers/findtransporterbydrivers", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),
  
    })
      .then(response => response.json())
      .then(async result => {
        console.log(result),
          this.dri=result.data
       
      for(let i=0;i<this.dri.length;i++){
        this.onlydriver = this.dri[i]._id
        this.onedriver = this.dri[i].Drivers
      }
      localStorage.setItem('onlyTranspoterId',JSON.stringify(this.onlydriver))
          console.log(this.onedriver)
          loading.dismiss()
          this.single = this.onedriver.filter((data: { DriverNumber: string; })=>{
            return data.DriverNumber == String(this.truker.mobileNo)
          })
   console.log(this.single)
   for(let i=0;i<this.single.length;i++){
    this.Available = this.single[i].Availability
   
  }   
  console.log(this.Available)
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }



  async ChangeAvailable(){
  
    if(this.Available == true){
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
      var body ={
        _id :this.onlydriver,
        DriverNumber:String(this.truker.mobileNo),
        Availability:false
      }
      console.log(body)
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
          _id :this.onlydriver,
          DriverNumber:String(this.truker.mobileNo),
          Availability:true
        }
        console.log(body)
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
    }
    autorefresh(event:any){
    
      setTimeout(() => {
        event.target.complete()
        //window.location.href="tab/tab1"
       window.location.reload()
      }, 2000);
    }
}
