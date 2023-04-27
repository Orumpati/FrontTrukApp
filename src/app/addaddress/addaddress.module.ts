import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddaddressPageRoutingModule } from './addaddress-routing.module';

import { AddaddressPage } from './addaddress.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddaddressPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddaddressPage]
})
export class AddaddressPageModule {}
