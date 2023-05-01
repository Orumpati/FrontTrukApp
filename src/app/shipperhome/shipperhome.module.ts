import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
//import { ChangelookforComponent } from '../changelookfor/changelookfor.component';
import { ShipperhomePageRoutingModule } from './shipperhome-routing.module';
//import { HttpClient } from '@angular/common/http';
import { ShipperhomePage } from './shipperhome.page';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipperhomePageRoutingModule,
    TranslateModule
    //HttpClient

  ],
  declarations: [ShipperhomePage],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
})
export class ShipperhomePageModule {}
