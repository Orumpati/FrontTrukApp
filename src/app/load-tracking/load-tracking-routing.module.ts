import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadTrackingPage } from './load-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: LoadTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadTrackingPageRoutingModule {}
