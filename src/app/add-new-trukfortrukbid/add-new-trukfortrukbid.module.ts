import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewTrukfortrukbidPageRoutingModule } from './add-new-trukfortrukbid-routing.module';

import { AddNewTrukfortrukbidPage } from './add-new-trukfortrukbid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewTrukfortrukbidPageRoutingModule
  ],
  declarations: [AddNewTrukfortrukbidPage]
})
export class AddNewTrukfortrukbidPageModule {}
