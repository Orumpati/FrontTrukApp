import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
})
export class EditPagePage implements OnInit {

  data: any;
  item: any = [];

  objects: any;

  fb: any;

  real: any;
  products: any;
  result: any;

  Id: any
  updateproductForm: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,public loadingController: LoadingController) { }
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
      comments: [''],
      length: [''],
      breadth: [''],
      height: [''],
      data: ['']
    })
  }

  async updateForm(data: any) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent'
    });
    await loading.present();


    console.log(data)
    //console.log(this.description, this.image, this.price, this.description, this.name)
    console.log(this.real._id)
    fetch("https://amused-crow-cowboy-hat.cyclic.app/quotes/updateQuotes/" + this.real._id, {
      method: 'PUT',
      headers: {
        "access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),        // JSON Means An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.

    })
      .then(response => response.json())
      .then(result => {
        console.log(result),

          this.products = JSON.parse(result)  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions

        this.updateproductForm.reset();
        loading.dismiss()   // form reset
        window.location.reload()  // reloading window

      }

      ).catch(err =>{
        loading.dismiss()
        console.log(err)
      })
  }
  

 



}


