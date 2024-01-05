import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const CanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.checkAuthentication().pipe(
    tap((isLoginUser) => {
      if (isLoginUser) {
        router.navigate(['./']);
      }
    }),
    map(isLogin => !isLogin)
  );
};

export const CanMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.checkAuthentication().pipe(
    tap((isLoginUser) => {
      if (isLoginUser) {
        router.navigate(['./']);
      }
    }),
    map((isLogin) => !isLogin)
  );
}

export const PublicGuard = {
  CanActivate,
  CanMatch,
};
