import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllNotificationsPageRoutingModule } from './all-notifications-routing.module';

import { AllNotificationsPage } from './all-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllNotificationsPageRoutingModule
  ],
  declarations: [AllNotificationsPage]
})
export class AllNotificationsPageModule {}
