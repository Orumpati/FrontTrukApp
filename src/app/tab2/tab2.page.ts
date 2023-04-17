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
   /*togglesss(isActive:any){
    this.isactive=isActive
    this.inTransitget()
    console.log(isActive)
   }*/
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
        "access-Control-Allow-Origin": "*",
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

  /*inTransitget(){
    var body={
          mobileNo:9876543234,
          isActive:"In-Progress"
        }
        fetch("http://localhost:3000/quotes/LoadMarket", {
          method: 'POST',
          headers: {
            "access-Control-Allow-Origin": "*",
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
    
      }*/
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
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result),
          this.item = result.item
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
        "access-Control-Allow-Origin": "*",

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
    this.router.navigate(['place-bid'], 
        { state: { profile: load._id }});
    this.router.navigate(["place-bid"])
    
   }


  signout(){
    localStorage.removeItem('regdata')
    window.location.href='/loginotp'
  }
 
}
