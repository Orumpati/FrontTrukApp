import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofofdeliveryPageRoutingModule } from './proofofdelivery-routing.module';

import { ProofofdeliveryPage } from './proofofdelivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProofofdeliveryPageRoutingModule
  ],
  declarations: [ProofofdeliveryPage]
})
export class ProofofdeliveryPageModule {}
