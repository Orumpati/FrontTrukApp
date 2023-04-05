import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDriversPage } from './add-drivers.page';

const routes: Routes = [
  {
    path: '',
    component: AddDriversPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDriversPageRoutingModule {}
