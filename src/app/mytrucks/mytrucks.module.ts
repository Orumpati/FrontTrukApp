import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytrucksPageRoutingModule } from './mytrucks-routing.module';

import { MytrucksPage } from './mytrucks.page';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
//import { LookingforPageModule } from '../lookingfor/lookingfor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytrucksPageRoutingModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [MytrucksPage]
})
export class MytrucksPageModule {}
