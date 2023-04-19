import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ShipperguardGuard } from '../guards/shipperguard.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        //canActivate:[ShipperguardGuard]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule),
       // canActivate:[ShipperguardGuard]
      },
      {
        path: 'shipperhome',
        loadChildren: () => import('../shipperhome/shipperhome.module').then(m => m.ShipperhomePageModule)
      },
      {
        path: 'mytrucks',
        loadChildren: () => import('../mytrucks/mytrucks.module').then(m => m.MytrucksPageModule)
      },
      {
        path: 'driver-active-loads',
        loadChildren: () => import('../driver-active-loads/driver-active-loads.module').then(m => m.DriverActiveLoadsPageModule)
      },
      {
        path: 'previous-loads',
        loadChildren: () => import('../previous-loads/previous-loads.module').then(m => m.PreviousLoadsPageModule)
      },
    
    ]
    
  },
  {
    path: '',
    redirectTo: '/tab1',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
