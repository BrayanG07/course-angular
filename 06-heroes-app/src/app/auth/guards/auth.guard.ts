import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

const checkAuthStatus: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService)

  return authService.checkAuthentication().pipe(
    tap(isAuthenticated => console.log(`isAuthenticated: ${isAuthenticated}`)),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    })
  );
};

export const AuthGuard = {
  checkAuthStatus,
};
