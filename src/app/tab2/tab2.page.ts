import { Component } from '@angular/core';

import {  OnInit, NgZone } from '@angular/core';
import 'firebase/compat/auth';
import  'firebase/auth';
import 'firebase/compat/firestore';
import  firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  item: any = [];    //Storing the items data in the array


  OriginLocation: any;
  DestinationLocation: any;
  date: any;
  vehicle: any;
  product: any;
  Quantity: any;
  expectedPrice: any;
  searchtext: any;
  AttendenceArray: any;
  tabkey: any;
  tabValue: any;
  logindata: any;
  isactive: any;
  items: any;
  truckshift: any;
  loortr: any;
  


  getData() {
    this.AttendenceArray.forEach((element: any) => {
      this.tabkey = Object.keys(element);
      this.tabValue?.push(Object.values(element));
    });
    console.log(this.getData)
  }

  constructor(private router:Router,public loadingController: LoadingController) { }
  ngOnInit(): void {
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    this.post()
    this.loortr =JSON.parse(localStorage.getItem('lookingfor') || '{}')
  }
  ionViewDidEnter(){
    this.post()
    //this.toggle()
  }
  toggle(){
    //this.isactive=isActive
    this.post()
    //console.log(isActive)
   }

   toggless(isActive:any){
    this.isactive=isActive
    this.completedGet()
    console.log(isActive)
   }

   post() {
    var body={
      mobileNo:this.logindata.mobileNo, //regter ayena vadi number
      isActive:"Active"
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/LoadMarket", {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.item
        console.log(this.item)
      }

      ).catch(err =>
        console.log(err))
  }

  AcceptedbyShipper(){
    var body={
      mobileNo:this.logindata.mobileNo,
     // isShipperAccepted:true,
      //isAgentAccepted:false,
      shareContact:false
        }
        fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/transporteInprogress", {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(body),
        })
          .then(response => response.json())
          .then(result => {
            console.log(result),
              this.items = result.item
          
              this.item =this.items.filter((data: { shipperAccept: any; }) =>{
                return data.shipperAccept == true
              })
            console.log(this.item)
          }
    
          ).catch(err =>
            console.log(err))
    
      }
   async completedGet(){
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();
    var body={
      mobileNo:this.logindata.mobileNo,//regter ayena vadi number
      isActive:"Completed"
    }
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/LoadMarket", {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        var data=result.item.filter((data: { contactSharedNum: any; })=>{
          return data.contactSharedNum == this.logindata.mobileNo
        })
          this.item = data
        console.log(this.item)
        loading.dismiss()
      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }
  
  
  async get() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/allQuotes", {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",

      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.Loads
        console.log(this.item)
        loading.dismiss()
      }

      ).catch(err =>{
         loading.dismiss()
        console.log(err)})
  }



   loadById(load: any) {
  //   console.log(load)
    localStorage.setItem("loadBy", JSON.stringify(load));
  
    this.router.navigate(["place-bid"])
    
   }


  signout(){
    localStorage.removeItem('regdata')
    window.location.href='/loginotp'
  }

  looking(){
    this.truckshift ="trucks"
      localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
      window.location.href='/tab/shipperhome'
    }
    lookingload(){
    this.truckshift ="loads"
      localStorage.setItem('lookingfor',JSON.stringify(this.truckshift))
      window.location.href='/tab/shipperhome'
  //this.router.navigate('shipperhome')
    }
 
}
