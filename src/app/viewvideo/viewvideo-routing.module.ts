import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewvideoPage } from './viewvideo.page';

const routes: Routes = [
  {
    path: '',
    component: ViewvideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewvideoPageRoutingModule {}
