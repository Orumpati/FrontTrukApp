import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.page.html',
  styleUrls: ['./all-notifications.page.scss'],
})
export class AllNotificationsPage implements OnInit {
  allNotifications: any;
date:any;
  logindata: any;
  constructor( private location:Location,private router:Router) {
    
   }

  ngOnInit() {
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    var Notifications = localStorage.getItem('InappNotifictions') 
    if(Notifications == ''||Notifications == null||Notifications == undefined ){
      alert('No Notifications')
    }else{
      this.allNotifications = Notifications
    }
    this.date = new Date().getTime()

  }

  back(){
this.location.back()
  }
  getTimeStamp(){
    return new Date().toLocaleString();
  }
goback(){
  if(this.logindata.role == 'Shipper'){
    this.router.navigate(['tab/tab1'])
  }else{
    this.router.navigate(['tab/tab2'])
  }
}
}
