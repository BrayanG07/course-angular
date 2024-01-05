import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayaoutComponent } from './layouts/dashboard-layaout/dashboard-layaout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayaoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
