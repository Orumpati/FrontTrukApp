import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverMoreDetailsPageRoutingModule } from './driver-more-details-routing.module';

import { DriverMoreDetailsPage } from './driver-more-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverMoreDetailsPageRoutingModule
  ],
  declarations: [DriverMoreDetailsPage]
})
export class DriverMoreDetailsPageModule {}
