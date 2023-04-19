import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipperhomePage } from './shipperhome.page';

const routes: Routes = [
  {
    path: '',
    component: ShipperhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipperhomePageRoutingModule {}
