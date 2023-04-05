import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadOtpPage } from './load-otp.page';

const routes: Routes = [
  {
    path: '',
    component: LoadOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadOtpPageRoutingModule {}
