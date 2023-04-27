import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachPrefferdNewloadPageRoutingModule } from './attach-prefferd-newload-routing.module';

import { AttachPrefferdNewloadPage } from './attach-prefferd-newload.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachPrefferdNewloadPageRoutingModule,
    TranslateModule
  ],
  declarations: [AttachPrefferdNewloadPage]
})
export class AttachPrefferdNewloadPageModule {}
