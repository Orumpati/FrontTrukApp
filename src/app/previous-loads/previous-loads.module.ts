import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousLoadsPageRoutingModule } from './previous-loads-routing.module';

import { PreviousLoadsPage } from './previous-loads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousLoadsPageRoutingModule
  ],
  declarations: [PreviousLoadsPage]
})
export class PreviousLoadsPageModule {}
