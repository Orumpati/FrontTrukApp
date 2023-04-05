import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDriversPageRoutingModule } from './add-drivers-routing.module';

import { AddDriversPage } from './add-drivers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDriversPageRoutingModule
  ],
  declarations: [AddDriversPage]
})
export class AddDriversPageModule {}
