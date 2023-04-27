import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    DatePipe,
    TranslateModule,
    ReactiveFormsModule,NgMultiSelectDropDownModule.forRoot()
    
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
