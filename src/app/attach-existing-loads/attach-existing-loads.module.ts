import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachExistingLoadsPageRoutingModule } from './attach-existing-loads-routing.module';

import { AttachExistingLoadsPage } from './attach-existing-loads.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachExistingLoadsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AttachExistingLoadsPage]
})
export class AttachExistingLoadsPageModule {}
