import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
@Component({
  selector: 'app-viewshippercon',
  templateUrl: './viewshippercon.page.html',
  styleUrls: ['./viewshippercon.page.scss'],
})
export class ViewshipperconPage implements OnInit {
  vehdetails: any;
  sdf: any;
  mess:any="copied Successfully"
  constructor(private clipboard:Clipboard) { }

  ngOnInit() {
    this.vehdetails=JSON.parse(localStorage.getItem('vehdetails')|| '{}')
    for(let i=0;i<this.vehdetails.vehicleInformation.length;i++){
      this.sdf =this.vehdetails.vehicleInformation[i]
    }
    console.log(this.vehdetails)
  }
  copy(){
    this.clipboard.copy(this.sdf.mobileNumber);
    //this.clipboard.copy(this.logindata.referalCode)
    alert(this.mess)
  }
}
