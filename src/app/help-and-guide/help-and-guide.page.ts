import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-and-guide',
  templateUrl: './help-and-guide.page.html',
  styleUrls: ['./help-and-guide.page.scss'],
})
export class HelpAndGuidePage implements OnInit {
  logindata: any;

  constructor() { }

  ngOnInit() {
    this.logindata=  JSON.parse(localStorage.getItem('regdata')|| '{}')
  }

}
