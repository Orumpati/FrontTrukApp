import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.page.html',
  styleUrls: ['./all-notifications.page.scss'],
})
export class AllNotificationsPage implements OnInit {
  allNotifications: any;

  constructor() { }

  ngOnInit() {
    this.allNotifications = JSON.parse(localStorage.getItem('InappNotifictions') || '{}')
  }

}
