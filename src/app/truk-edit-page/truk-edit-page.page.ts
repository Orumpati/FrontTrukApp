import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-truk-edit-page',
  templateUrl: './truk-edit-page.page.html',
  styleUrls: ['./truk-edit-page.page.scss'],
})
export class TrukEditPagePage implements OnInit {

  toppings: any;
  trukname: any;
  dropdownList: any[] = [];
  trukoperatingRoutes: any = [];
  dropdownSettings!: IDropdownSettings;
  trukvehiclenumber: any;
  trukcurrentLocation: any;
  trukcapacity: any;
  Items: any;
  trukdate: any;
  real: any;


  updateproductForm!: FormGroup;
  objects: any;
  products: any;

  constructor(private fb: FormBuilder,public loadingController: LoadingController) { }

  ngOnInit() {




    this.objects = localStorage.getItem("TrukPosted");  //use the localstorage we getdata from savedData
    //The localStorage object allows you to save key/value pairs in the browser.
    this.real = JSON.parse(this.objects)  //parse() The JSON. parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

    console.log(this.objects)
    //this.get()

    this.updateproductForm = this.fb.group({
      trukoperatingRoutes: [''],
      trukcapacity: [''],
      trukcurrentLocation: [''],
      trukname: [''],
      trukdate: [''],
      trukvehiclenumber: ['']

    });



    this.dropdownList = [
      'Amaravati', 
      'Itanagar',
      'Dispur',
      'Patna',
      'Raipur',
      'Panaji',
      'Gandhinagar',
      'Chandigarh',
      'Shimla',
      'Ranchi',
      'Bangaluru',
      'Thiruvananthapuram',
      'Bhopal',
      'mumbai',
      'Imphal',
      'Shillong',
      'Aizawl',
      'Kohima',
      'Bhubaneswar',
      'Chandigarh',
      'Jaipur',
      'Gangtok',
      'Chennai',
      'Hyderabad',
      'Agartala',
      'Lucknow',
      'Kolkata',
      'delhi',
      'Pune',
    ];
    this.trukoperatingRoutes = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  out(data: any) {
    console.log(data)
    this.trukname = data
  }




  //updateform(PUT API)
  async updateForm(data: any) {
    const loading = await this.loadingController.create({
      message: 'Verifying...',
      spinner: 'crescent'
    });
    await loading.present();

    var body = {
      trukvehiclenumber: this.updateproductForm.value.trukvehiclenumber,
      trukcapacity: this.updateproductForm.value.trukcapacity,
      trukcurrentLocation: this.updateproductForm.value.trukcurrentLocation,
      trukoperatingRoutes: this.updateproductForm.value.trukoperatingRoutes,
      trukname: this.trukname,
      trukdate: this.updateproductForm.value.trukdate
    }
    console.log(data)
    //console.log(this.description, this.image, this.price, this.description, this.name)
    console.log(this.real._id)
    fetch("https://trukapp2023.herokuapp.com/addTruk/updateLoads/" + this.real._id, {
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

          this.products = JSON.parse(result)  //it  runs $parse automatically when it runs the $digest loop, basically $parse is the way angular evaluates expressions

        this.updateproductForm.reset(); 
        loading.dismiss()  // form reset
        window.location.reload()  // reloading window

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