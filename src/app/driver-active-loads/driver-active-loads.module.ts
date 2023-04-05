import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverActiveLoadsPageRoutingModule } from './driver-active-loads-routing.module';

import { DriverActiveLoadsPage } from './driver-active-loads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverActiveLoadsPageRoutingModule
  ],
  declarations: [DriverActiveLoadsPage]
})
export class DriverActiveLoadsPageModule {}
