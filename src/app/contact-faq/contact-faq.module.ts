import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactFaqPageRoutingModule } from './contact-faq-routing.module';

import { ContactFaqPage } from './contact-faq.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactFaqPageRoutingModule,
    TranslateModule
  ],
  declarations: [ContactFaqPage]
})
export class ContactFaqPageModule {}
