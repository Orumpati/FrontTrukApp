import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-add-drivers',
  templateUrl: './add-drivers.page.html',
  styleUrls: ['./add-drivers.page.scss'],
})
export class AddDriversPage implements OnInit {
  TrukType:any;
  TrukNumber:any;
  TrukCapacity:any;
  TrukImage:any;
  RcImage:any;
  DrivingLienceImage:any;
  AadharImage:any;
  PanImage:any;
  DriverName:any;
  DriverNumber:any;
  images: any;
  logindata: any;
  constructor(private loadingController :LoadingController) { }

  ngOnInit() {
    this.logindata = JSON.parse(localStorage.getItem('regdata')||'{}')
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      //console.log(file);
      this.images = file;
    }
    console.log(this.images)
  }
 async postVehile(){
  
      /*const formdata = new FormData();
      for(let pdffiles of this.images){
        formdata.append('datas',pdffiles);
      }*/
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loading.present();
    var data = {
      _id :this.logindata.Authentication,
      TrukType:this.TrukType,
      TrukNumber:this.TrukNumber,
      TrukCapacity:this.TrukCapacity,
      TrukImage:this.TrukImage,
      RcImage:this.RcImage,
      DrivingLienceImage:this.DrivingLienceImage,
      AadharImage:this.AadharImage,
      PanImage:this.PanImage,
      DriverName:this.DriverName,
      DriverNumber:this.DriverNumber
    }
    console.log(data)
    fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/AddDrivers", {
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then(response => response.json())
      .then(async result => {
        console.log(result)
       // this.Items = result
        loading.dismiss()
        this.addDriverOutSide()
   alert('Driver Added')
  
window.location.href='/drivers'
    


      }

      ).catch(err =>
        console.log(err))
       loading.dismiss()

      }


      addDriverOutSide(){
        var driverdata = {
    
          TrukType:this.TrukType,
          TrukNumber:this.TrukNumber,
          TrukCapacity:this.TrukCapacity,
          TrukImage:this.TrukImage,
          RcImage:this.RcImage,
          DrivingLienceImage:this.DrivingLienceImage,
          AadharImage:this.AadharImage,
          PanImage:this.PanImage,
          DriverName:this.DriverName,
          mobileNo:this.DriverNumber,
          userRole:"Driver"
        }
  
         fetch("https://trukapp2023.herokuapp.com/TruckAppUsers/signupDriver", {
          method: 'post',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(driverdata),
    
        })
          .then(response => response.json())
          .then(async result => {
            console.log(result)

        
    
    
          }
    
          ).catch(err =>
            console.log(err))
        
    
      }

      autorefresh(event:any){
    
        setTimeout(() => {
          event.target.complete()
         window.location.reload()
        }, 2000);
      }
  }

