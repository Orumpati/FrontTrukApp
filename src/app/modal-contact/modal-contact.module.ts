import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalContactPageRoutingModule } from './modal-contact-routing.module';

import { ModalContactPage } from './modal-contact.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalContactPageRoutingModule,
    TranslateModule
  ],
  declarations: [ModalContactPage]
})
export class ModalContactPageModule {}
