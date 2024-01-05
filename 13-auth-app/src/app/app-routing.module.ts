import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as ManageRoutes from './constants';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAutenticatedGuard } from './auth/guards/is-not-autenticated.guard';

const routes: Routes = [
  {
    path: ManageRoutes.KR_AUTH,
    canActivate: [isNotAutenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: ManageRoutes.KR_DASHBOARD,
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: ManageRoutes.KR_AUTH
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
