import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousLoadsPage } from './previous-loads.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousLoadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousLoadsPageRoutingModule {}
