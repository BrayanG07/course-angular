import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayaoutComponent } from './layouts/dashboard-layaout/dashboard-layaout.component';


@NgModule({
  declarations: [
    DashboardLayaoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
