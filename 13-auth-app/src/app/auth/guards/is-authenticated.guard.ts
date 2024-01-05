import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enum/auth-status.enum';
import { KR_AUTH, KR_AUTH_LOGIN } from '../../constants';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    return true
  }

  if (authService.authStatus() === AuthStatus.CHECKING) {
    return false;
  }

  router.navigate([`${KR_AUTH_LOGIN}`])
  return false;
}
