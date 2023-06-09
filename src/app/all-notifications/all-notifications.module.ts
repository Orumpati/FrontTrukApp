import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllNotificationsPageRoutingModule } from './all-notifications-routing.module';

import { AllNotificationsPage } from './all-notifications.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllNotificationsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllNotificationsPage]
})
export class AllNotificationsPageModule {}
