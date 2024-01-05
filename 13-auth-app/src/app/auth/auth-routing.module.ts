import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import * as ManageRoutes from '../constants';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: ManageRoutes.KR_AUTH_LOGIN,
        component: LoginPageComponent,
      },
      {
        path: ManageRoutes.KR_AUTH_REGISTER,
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: ManageRoutes.KR_AUTH_LOGIN
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
