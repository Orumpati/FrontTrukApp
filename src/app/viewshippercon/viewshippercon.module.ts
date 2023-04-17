import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewshipperconPageRoutingModule } from './viewshippercon-routing.module';

import { ViewshipperconPage } from './viewshippercon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewshipperconPageRoutingModule
  ],
  declarations: [ViewshipperconPage]
})
export class ViewshipperconPageModule {}
