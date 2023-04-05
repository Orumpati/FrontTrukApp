import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { OneSignal } from '@ionic-native/onesignal';
import OneSignal from 'onesignal-cordova-plugin';
//import {OneSignal} from '@ionic-native/onesignal'
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  notificationToken: any;
  UniqueDeviceID!:string;

  AllNotifications: any[] = [];
  Items: any;
  logindata: any;
  constructor(private platform: Platform,private uniqueDeviceID: UniqueDeviceID) {
this. getUniqueDeviceID()
    platform.ready().then(() => {
      this.OneSignalInit();
    });

    const storedItems = localStorage.getItem('InappNotifictions');
    if (storedItems) {
      this.AllNotifications = JSON.parse(storedItems);

    }

this.getUniqueDeviceID()
  }
  ngOnInit(): void {
    this.logindata =JSON.parse(localStorage.getItem('regdata') || '{}')
    console.log(this.logindata)
  }
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        this.UniqueDeviceID = uuid;

        //alert(this.UniqueDeviceID)
      })
      .catch((error: any) => {
        console.log(error);
        this.UniqueDeviceID = "Error! ${error}";
      });
  }

  // Call this function when your app starts
 OneSignalInit(): void {
  // Uncomment to set OneSignal device logging to VERBOSE  

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("79da642e-49a6-4af9-8e6e-252680709d15");

  OneSignal.setNotificationWillShowInForegroundHandler( (jsonData) => {

    console.log("narayana" + JSON.stringify(jsonData))
    var a = JSON.stringify(jsonData)
    var v = JSON.parse(a)

    
    this.AllNotifications.push(v.notification.body);
    localStorage.setItem('InappNotifictions', JSON.stringify(this.AllNotifications));
    console.log('trukappp'+localStorage.getItem('InappNotifictions'))
    // this show Inapp notifications
    //alert(v.notification.title + v.notification.body)
     
    //alert(localStorage.getItem('InappNotifictions'))
    
    

  })

  OneSignal.setNotificationOpenedHandler((jsonData: any) => {
    
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

      var a = JSON.stringify(jsonData)
    var v = JSON.parse(a)

    
    this.AllNotifications.push(v.notification.body);
    localStorage.setItem('InappNotifictions', JSON.stringify(this.AllNotifications));
    console.log('trukappp'+localStorage.getItem('InappNotifictions'))
    // this show Inapp notifications
    //alert(v.notification.title + v.notification.body)
     
    //alert(localStorage.getItem('InappNotifictions'))
  });

  // Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });

OneSignal.setExternalUserId(this.UniqueDeviceID ,(result)=>{
  console.log(result)
 // alert(JSON.stringify(result))

 /* OneSignal.push(function() {
    OneSignal.setExternalUserId(externalUserId);
  });*/
})

  // TO-DO : get details from configuration
  /*OneSignal.startInit("913bcc8c-f580-44fb-94e5-1e5f97a80546", "ZTk0Y2I0NmEtMTVmZC00MDJjLTljYjYtOTNjYWYyZTBjODlh");
  OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
  OneSignal.handleNotificationReceived().subscribe((data:any) => {
      // do something when notification is received
      console.log("notification received");
      console.log(data);  
  });*/


/* OneSignal.endInit();
OneSignal.getIds().then((id: { userId: any; }) => {
      console.log("one signal player ID :- ");
      console.log(id.userId);
alert(id.userId)
      this.notificationToken = id.userId;
      //this.getStoreDetails();
  });*/

}

location(){
  localStorage.setItem('locatioPath',JSON.stringify('sidebar'))
}

signout(){
  localStorage.removeItem('regdata')
  localStorage.removeItem('lookingfor')
  window.location.href='/loginotp'
}



star = [1,   2,   3,   4,   5];
rating = 0;
staring:any;


updateRating(r: any) {
  console.log(r)
  this.rating = r

var body = {
  staring:this.rating
}
  fetch("https://amused-crow-cowboy-hat.cyclic.app/staring/staring", {
    method: 'post',
    headers: {
      "access-Control-Allow-Origin": "*",
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body),

  })
    .then(response => response.json())
    .then(result => {
      console.log(result),
        this.Items = result  
        
    }

    ).catch(err =>
      console.log(err))
}

}
