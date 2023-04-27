import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetStartedPageRoutingModule } from './get-started-routing.module';

import { GetStartedPage } from './get-started.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetStartedPageRoutingModule,
    TranslateModule
  ],
  declarations: [GetStartedPage]
})
export class GetStartedPageModule {}
