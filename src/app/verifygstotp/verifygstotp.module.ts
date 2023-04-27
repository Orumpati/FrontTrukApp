import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifygstotpPageRoutingModule } from './verifygstotp-routing.module';
import {NgOtpInputModule} from 'ng-otp-input';
import { VerifygstotpPage } from './verifygstotp.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifygstotpPageRoutingModule,
    NgOtpInputModule,
    TranslateModule
  ],
  declarations: [VerifygstotpPage]
})
export class VerifygstotpPageModule {}
