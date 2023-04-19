import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-attach-load',
  templateUrl: './attach-load.page.html',
  styleUrls: ['./attach-load.page.scss'],
})
export class AttachLoadPage implements OnInit {

  item: any = [];
  OriginLocation: any;
  DestinationLocation: any;
  date: any;
  data: any;
  expectedPrice: any;
  Quantity: any;
  product: any;
  typeOfPay:any;
  selected:any;
  language:any
  radiovalue:any
  logindata: any;
  
  

  constructor( private router:Router,public loadingController: LoadingController) { }
  ionViewDidEnter(){
    this.get()
  }
  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata')|| '{}')
    this.get()

  }


  // out(data: any) {
  //   console.log(data)
  //   this.get()
  //   this.data = data

  // }
  async get() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    var body ={
      Number:this.logindata.mobileNo,
      isActive :'Active'
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/loadsByStatusAndNumber", {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":'application/json'

      },
      body:JSON.stringify(body)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.load
        console.log(this.item)
        loading.dismiss()
      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)})
  }

  out(data:any){
    console.log(data)
    //this.language =data
  }

  sendData(data:any){
    console.log(data)
    this.language =data
    localStorage.setItem("attachload", JSON.stringify(data));
    //The localStorage object allows you to save key/value pairs in the browser.
  }

   proceed(){
     this.router.navigate(['attach-existing-loads'])
   }

}
