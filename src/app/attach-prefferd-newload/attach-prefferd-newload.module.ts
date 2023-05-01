import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachPrefferdNewloadPageRoutingModule } from './attach-prefferd-newload-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA  } from '@angular/core';
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
  declarations: [AttachPrefferdNewloadPage],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
})
export class AttachPrefferdNewloadPageModule {}
