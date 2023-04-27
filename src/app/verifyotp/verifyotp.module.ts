import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyotpPageRoutingModule } from './verifyotp-routing.module';
import {NgOtpInputModule} from 'ng-otp-input';
import { VerifyotpPage } from './verifyotp.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyotpPageRoutingModule,
    NgOtpInputModule,
    TranslateModule
  ],
  declarations: [VerifyotpPage]
})
export class VerifyotpPageModule {}
