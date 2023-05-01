import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewvideoPageRoutingModule } from './viewvideo-routing.module';

import { ViewvideoPage } from './viewvideo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewvideoPageRoutingModule
  ],
  declarations: [ViewvideoPage]
})
export class ViewvideoPageModule {}
