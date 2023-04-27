import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginotpPageRoutingModule } from './loginotp-routing.module';

import { LoginotpPage } from './loginotp.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginotpPageRoutingModule,
    TranslateModule
  ],
  declarations: [LoginotpPage]
})
export class LoginotpPageModule {}
