import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllNotificationsPage } from './all-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: AllNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllNotificationsPageRoutingModule {}
