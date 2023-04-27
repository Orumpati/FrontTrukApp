import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakepaymentPageRoutingModule } from './makepayment-routing.module';

import { MakepaymentPage } from './makepayment.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakepaymentPageRoutingModule,
    TranslateModule
  ],
  declarations: [MakepaymentPage]
})
export class MakepaymentPageModule {}
