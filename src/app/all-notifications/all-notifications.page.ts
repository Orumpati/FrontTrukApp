import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.page.html',
  styleUrls: ['./all-notifications.page.scss'],
})
export class AllNotificationsPage implements OnInit {
  allNotifications: any;
date:any;
  constructor( private location:Location) { }

  ngOnInit() {
    this.allNotifications = JSON.parse(localStorage.getItem('InappNotifictions') || '{}')
    this.date = new Date().getTime()
  }

  back(){
this.location.back()
  }
  getTimeStamp(){
    return new Date().toLocaleString();
  }

}
