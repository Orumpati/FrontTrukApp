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
  
   fetch("https://trukapp2023.herokuapp.com/quotes/findloadbydrivers", {
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
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
