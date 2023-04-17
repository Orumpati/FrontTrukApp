import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import  {FormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { HasRoleDirective } from './directives/has-role.directive';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

// Import plugin
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import {File} from'@awesome-cordova-plugins/file/ngx';
import {Crop} from '@ionic-native/crop/ngx'
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { OneSignal } from '@ionic-native/onesignal';
import { LoggeduserGuard } from './guards/loggeduser.guard';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { CapitalizeDirective } from './capitalize.directive';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { DatePipe } from '@angular/common';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ViewshipperconPipe } from './viewshippercon.pipe';
@NgModule({
  declarations: [AppComponent, CapitalizeDirective, ViewshipperconPipe, 
   // HasRoleDirective
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,Ng2SearchPipeModule,HttpClientModule,provideFirebaseApp(() => initializeApp(environment.firebase)), provideStorage(() => getStorage()), provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FormsModule,CommonModule,ReactiveFormsModule,HttpClient,SocialSharing,Clipboard,
    
  File,
  Camera,
  UniqueDeviceID,
  AndroidPermissions,
  Crop,
  LoggeduserGuard,
  DatePipe
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
