import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgOtpInputModule} from 'ng-otp-input';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    NgMultiSelectDropDownModule,
    NgOtpInputModule,
    TranslateModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
