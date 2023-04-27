import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrukallbidsPageRoutingModule } from './trukallbids-routing.module';

import { TrukallbidsPage } from './trukallbids.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrukallbidsPageRoutingModule,
    TranslateModule
  ],
  declarations: [TrukallbidsPage]
})
export class TrukallbidsPageModule {}
