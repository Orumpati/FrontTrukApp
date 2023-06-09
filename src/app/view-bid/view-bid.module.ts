import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBidPageRoutingModule } from './view-bid-routing.module';

import { ViewBidPage } from './view-bid.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBidPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewBidPage]
})
export class ViewBidPageModule {}
