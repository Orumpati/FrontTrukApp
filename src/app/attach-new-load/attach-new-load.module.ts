import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachNewLoadPageRoutingModule } from './attach-new-load-routing.module';

import { AttachNewLoadPage } from './attach-new-load.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachNewLoadPageRoutingModule,
    TranslateModule
  ],
  declarations: [AttachNewLoadPage]
})
export class AttachNewLoadPageModule {}
