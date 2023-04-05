import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndOtpPageRoutingModule } from './end-otp-routing.module';

import { EndOtpPage } from './end-otp.page';
import {NgOtpInputModule} from 'ng-otp-input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndOtpPageRoutingModule,
    NgOtpInputModule
    

  ],
  declarations: [EndOtpPage]
})
export class EndOtpPageModule {}
