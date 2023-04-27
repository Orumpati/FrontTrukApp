import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpAndGuidePageRoutingModule } from './help-and-guide-routing.module';

import { HelpAndGuidePage } from './help-and-guide.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpAndGuidePageRoutingModule,
    TranslateModule
  ],
  declarations: [HelpAndGuidePage]
})
export class HelpAndGuidePageModule {}
