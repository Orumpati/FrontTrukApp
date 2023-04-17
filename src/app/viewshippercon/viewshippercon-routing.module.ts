import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewshipperconPage } from './viewshippercon.page';

const routes: Routes = [
  {
    path: '',
    component: ViewshipperconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewshipperconPageRoutingModule {}
