import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-previous-loads',
  templateUrl: './previous-loads.page.html',
  styleUrls: ['./previous-loads.page.scss'],
})
export class PreviousLoadsPage implements OnInit {
  truker: any;
  loads: any;

  constructor(private loadingController:LoadingController) { }

  ngOnInit() {
    this.truker =JSON.parse(localStorage.getItem('regdata')|| '{}')
    this.get()
  }
  async get(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      
       
    mobileNo:String(this.truker.mobileNo),//"8008002050", //login driver number attached to the load in vehicle info
    DriverStatus:"Completed"
    }
    console.log(data)
    //localStorage.setItem("newpostAdd", JSON.stringify(data));
  
   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/findloadbydrivers", {
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
          this.loads=result.data
          console.log(this.loads)
          loading.dismiss()
  
       
  
      }
  
      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }

}
