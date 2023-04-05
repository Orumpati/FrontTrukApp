import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverActiveLoadsPage } from './driver-active-loads.page';

const routes: Routes = [
  {
    path: '',
    component: DriverActiveLoadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverActiveLoadsPageRoutingModule {}
