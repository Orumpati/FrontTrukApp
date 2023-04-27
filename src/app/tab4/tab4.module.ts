import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


//import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { IonicModule } from '@ionic/angular';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Tab4Page } from './tab4.page';
import {NgOtpInputModule} from 'ng-otp-input';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    NgOtpInputModule,
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot()
    //MatButtonToggleModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
