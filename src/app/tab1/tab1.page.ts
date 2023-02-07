import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  segmentValue='1';
  constructor() {}

  segmentChanged(event:any) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }


  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     // window.location.reload()
    }, 2000);
  }
}
