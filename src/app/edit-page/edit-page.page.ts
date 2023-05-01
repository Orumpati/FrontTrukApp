import { Component, OnInit, ViewChild } from '@angular/core';


import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
})
export class EditPagePage implements OnInit {

 
  @ViewChild(IonicSlides)
  slides!: typeof IonicSlides;
  data: any;
  item: any = [];

  objects: any;

  fb: any;

  real: any;
  products: any;
  result: any;

  Id: any;
  updateproductForm: any;
  slideOpts = {
    
  };

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  out(data: any) {
    console.log(data)
    this.data = data
  }
  ngOnInit() {



    this.objects = localStorage.getItem("currentSelectedLoad");  //use the localstorage we getdata from savedData
    //The localStorage object allows you to save key/value pairs in the browser.
    this.real = JSON.parse(this.objects)  //parse() The JSON. parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

    console.log(this.objects)
    //this.get()

    this.updateproductForm = this.formBuilder.group({
      OriginLocation: [''],
      DestinationLocation: [''],
      date: [''],
      // vehicle: [''],
      product: [''],
      Quantity: [''],

      expectedPrice: [''],
      //tonnes:[''],
      Number: [''],
      //loadCapacity:[''],

      typeOfPay: [''],
      paymentTypeForOffline: [''],
      advance: [''],
      comments: [''],
      length: [''],
      breadth: [''],
      height: [''],
      pickupState:[''],
      dropupState:[''],
      data: ['']
    })
  }

  
  updateForm(data: any) {


    var body = {
      DestinationLocation: this.updateproductForm.value.DestinationLocation,
      OriginLocation: this.updateproductForm.value.OriginLocation,
      pickupState: this.updateproductForm.value.pickup,
      dropupState: this.updateproductForm.value.dropup,
      Number: '12345678',
      date: this.updateproductForm.value.date,
      product: this.updateproductForm.value.product,
      Quantity: this.updateproductForm.value.Quantity,
      vehicle: this.updateproductForm.value.vehicle,
      
      expectedPrice: this.updateproductForm.value.expectedPrice,
      data: this.data,
      typeOfPay: this.updateproductForm.value.typeOfPay,
     
      
      comments: this.updateproductForm.value.comments
    }



    console.log(data)
    //console.log(this.description, this.image, this.price, this.description, this.name)
    console.log(this.real._id)
    fetch("https://trukapp2023.herokuapp.com/quotes/updateQuotes/" + this.real._id, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(body),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),

        

        //this.updateproductForm.reset();   // form reset
        window.location.href='/tab/tab1'  // reloading window

      }

      ).catch(err =>
        console.log(err))
  }
  

  // slidePrev() {
  //   this.slides.slidePrev();
  // }

  // slideNext() {
  //   this.slides.slideNext();
  // }


 



}


