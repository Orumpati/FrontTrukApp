import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewTrukfortrukbidPage } from './add-new-trukfortrukbid.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewTrukfortrukbidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewTrukfortrukbidPageRoutingModule {}
