import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-existing-loads',
  templateUrl: './existing-loads.page.html',
  styleUrls: ['./existing-loads.page.scss'],
})
export class ExistingLoadsPage implements OnInit {

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
  
  

  constructor( private router:Router) { }
  disabled=true
  ngOnInit() {
    this.get()

  }

ionViewDidEnter(){
  this.get()
}
  // out(data: any) {
  //   console.log(data)
  //   this.get()
  //   this.data = data

  // }
  get() {
    fetch("https://trukapp2023.herokuapp.com/quotes/allQuotes", {
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
      }

      ).catch(err =>
        console.log(err))
  }

  out(data:any){
    console.log(data)
    this.language =data
  }

  sendData(data:any){
    console.log(data)
    localStorage.setItem("attachload", JSON.stringify(data));
    //The localStorage object allows you to save key/value pairs in the browser.
  }

   proceed(){
     this.router.navigate(['attach-existing-loads'])
   }

}


