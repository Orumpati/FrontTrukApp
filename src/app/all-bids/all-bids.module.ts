import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllBidsPageRoutingModule } from './all-bids-routing.module';

import { AllBidsPage } from './all-bids.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBidsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllBidsPage]
})
export class AllBidsPageModule {}
