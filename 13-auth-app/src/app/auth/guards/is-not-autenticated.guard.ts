import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enum/auth-status.enum';
import { KR_DASHBOARD } from '../../constants';

export const isNotAutenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    router.navigate([KR_DASHBOARD])
    return false;
  }

  return true;
};
