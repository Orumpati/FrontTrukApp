import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineshareContactPageRoutingModule } from './onlineshare-contact-routing.module';

import { OnlineshareContactPage } from './onlineshare-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineshareContactPageRoutingModule
  ],
  declarations: [OnlineshareContactPage]
})
export class OnlineshareContactPageModule {}
