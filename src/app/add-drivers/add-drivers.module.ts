import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDriversPageRoutingModule } from './add-drivers-routing.module';

import { AddDriversPage } from './add-drivers.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDriversPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddDriversPage]
})
export class AddDriversPageModule {}
