import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IonicModule } from '@ionic/angular';

import { AddTruckPageRoutingModule } from './add-truck-routing.module';

import { AddTruckPage } from './add-truck.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTruckPageRoutingModule,
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [AddTruckPage]
})
export class AddTruckPageModule {}
