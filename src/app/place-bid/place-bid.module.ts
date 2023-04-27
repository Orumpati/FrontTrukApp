import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceBidPageRoutingModule } from './place-bid-routing.module';

import { PlaceBidPage } from './place-bid.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceBidPageRoutingModule,
    TranslateModule
  ],
  declarations: [PlaceBidPage]
})
export class PlaceBidPageModule {}
