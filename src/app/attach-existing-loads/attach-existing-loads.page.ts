import { Component, OnInit } from '@angular/core';
declare var google: any;
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'
@Component({
  selector: 'app-attach-existing-loads',
  templateUrl: './attach-existing-loads.page.html',
  styleUrls: ['./attach-existing-loads.page.scss'],
})
export class AttachExistingLoadsPage implements OnInit {

  Items: any = [];
  objects: any;
  real: any;
  truk: any;
  TrukPost: any;


  trukname:any;
  OriginLocation:any;
  trukcapacity:any;
  trukoperatingRoutes:any;
  trukdate:any;
  trukvehiclenumber:any;
  router: any;
  trukOwnerNumber:any;


  
  constructor(private alertController: AlertController, router:Router,public loadingController: LoadingController) {  }
  ngOnInit(): void {
    this.objects = localStorage.getItem("selectedTruk");  //use the localstorage we getdata from savedData
    //The localStorage object allows you to save key/value pairs in the browser.
    this.real = JSON.parse(this.objects)  //parse() The JSON. parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

    console.log(this.real)

    this.truk = localStorage.getItem("attachload");  
    //The localStorage object allows you to save key/value pairs in the browser.
    this.TrukPost = JSON.parse(this.truk)  //parse() The JSON. parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

    console.log(this.TrukPost)
  }

  async SendExistingload() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      _id:this.TrukPost._id,
      trukname:this.real.trukname,
      OriginLocation:this.real.OriginLocation,
      trukcapacity:this.real.trukcapacity,
      trukdate:this.real.trukdate,
      trukoperatingRoutes:this.real.trukoperatingRoutes,
      trukOwnerNumber:this.real.trukOwnerNumber,
      trukvehiclenumber:this.real.trukvehiclenumber,
      
      
    }
    console.log(data)
    localStorage.setItem("newpostAdd", JSON.stringify(data));

    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/addTruckMarketVehicleToLoad", {
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
          this.Items = result
          this.Sendloadtovehicle()
          loading.dismiss()
          const alert = await this.alertController.create({
            header: 'Successfully added',
            // subHeader: 'Important message',
           // message: 'truk  Successfully',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  console.log('Confirm Okay');
              
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
  

  //add load to vehicle
  async Sendloadtovehicle() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var data = {
      _id:this.real._id,
       
    loadids:this.truk._id
     
    }
    console.log(data)
    //localStorage.setItem("newpostAdd", JSON.stringify(data));

   fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/addloadtotruck", {
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

}
