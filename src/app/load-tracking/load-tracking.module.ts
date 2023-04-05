import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadTrackingPageRoutingModule } from './load-tracking-routing.module';

import { LoadTrackingPage } from './load-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadTrackingPageRoutingModule
  ],
  declarations: [LoadTrackingPage]
})
export class LoadTrackingPageModule {}
