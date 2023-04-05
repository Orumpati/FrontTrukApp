import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadOtpPageRoutingModule } from './load-otp-routing.module';
import {NgOtpInputModule} from 'ng-otp-input';
import { LoadOtpPage } from './load-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadOtpPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [LoadOtpPage]
})
export class LoadOtpPageModule {}
