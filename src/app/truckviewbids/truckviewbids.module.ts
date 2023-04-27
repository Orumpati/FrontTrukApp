import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckviewbidsPageRoutingModule } from './truckviewbids-routing.module';

import { TruckviewbidsPage } from './truckviewbids.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruckviewbidsPageRoutingModule,
    TranslateModule
  ],
  declarations: [TruckviewbidsPage]
})
export class TruckviewbidsPageModule {}
