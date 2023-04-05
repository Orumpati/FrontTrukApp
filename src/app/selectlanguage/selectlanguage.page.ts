import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {OneSignal} from '@ionic-native/onesignal'
@Component({
  selector: 'app-selectlanguage',
  templateUrl: './selectlanguage.page.html',
  styleUrls: ['./selectlanguage.page.scss'],
})
export class SelectlanguagePage implements OnInit {
  language:any
  radiovalue:any
  notificationToken: any;
  constructor(private router:Router) { }
disabled=true
  ngOnInit() {
    
    console.log(this.language)


   /* OneSignal.startInit("913bcc8c-f580-44fb-94e5-1e5f97a80546", "ZTk0Y2I0NmEtMTVmZC00MDJjLTljYjYtOTNjYWYyZTBjODlh");
    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
    OneSignal.handleNotificationReceived().subscribe((data:any) => {
        // do something when notification is received
        console.log("notification received");
        console.log(data);  
    });
  
  
  
  
  
  
  OneSignal.getIds().then((id: { userId: any; }) => {
        console.log("one signal player ID :- ");
        console.log(id.userId);
  alert(id.userId)
        this.notificationToken = id.userId;
      
    });*/
  }


  out(data:any){
    console.log(data)
    this.language =data
  }
  selectlanguage(){
 
      
    localStorage.setItem('language',JSON.stringify(this.language))
    this.router.navigate(['get-started'])
    window.location.href='/get-started'
//this.router.navigateByUrl('/get-started')
    

  }
  autorefresh(event:any){
    
    setTimeout(() => {
      event.target.complete()
      //window.location.href="tab/tab1"
     window.location.reload()
    }, 2000);
  }
}
