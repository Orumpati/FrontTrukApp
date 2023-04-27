import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
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
  declarations: [ShipperhomePage]
})
export class ShipperhomePageModule {}
