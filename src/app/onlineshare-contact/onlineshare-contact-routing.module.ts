import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineshareContactPage } from './onlineshare-contact.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineshareContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineshareContactPageRoutingModule {}
