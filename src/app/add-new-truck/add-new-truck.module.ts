import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewTruckPageRoutingModule } from './add-new-truck-routing.module';

import { AddNewTruckPage } from './add-new-truck.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewTruckPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddNewTruckPage]
})
export class AddNewTruckPageModule {}
