import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProofofdeliveryPage } from './proofofdelivery.page';

const routes: Routes = [
  {
    path: '',
    component: ProofofdeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProofofdeliveryPageRoutingModule {}
