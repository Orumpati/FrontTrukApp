import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecttypePageRoutingModule } from './selecttype-routing.module';

import { SelecttypePage } from './selecttype.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecttypePageRoutingModule,
    TranslateModule
  ],
  declarations: [SelecttypePage]
})
export class SelecttypePageModule {}
