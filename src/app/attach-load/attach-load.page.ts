import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-attach-load',
  templateUrl: './attach-load.page.html',
  styleUrls: ['./attach-load.page.scss'],
})
export class AttachLoadPage implements OnInit {
toggle!:boolean
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
  
  
  backgroundColor = 'orange';
  Color='black'
  slectindex: any;
  lang: any;
  constructor( private router:Router,public loadingController: LoadingController,private translateConfigService: TranslateConfigService, private translate: TranslateService,) { 

    
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }
  ionViewDidEnter(){
    this.get()
  }
  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata')|| '{}')
    this.get()
    this.lang = JSON.parse(localStorage.getItem('language')||'{}')
    this.translateConfigService.setLanguage(this.lang);
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
    fetch("https://trukapp2023.herokuapp.com/quotes/loadsByStatusAndNumber", {
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

  sendData(data:any,index:any){
    console.log(data)
  
// var den = this.item.filter((a: { _id: any; })=>{
//   return a._id == data._id
// })
// console.log(den)
// for(let i=0;i<den.length;i++){
//   var sajeed =den[i]._id
// }
//     if(sajeed == data._id){
//       this.toggle =!this.toggle
//     }
    this.language =data
    localStorage.setItem("attachload", JSON.stringify(data));
    //The localStorage object allows you to save key/value pairs in the browser.
  }

   proceed(){
     this.router.navigate(['attach-existing-loads'])
   }


  

}
