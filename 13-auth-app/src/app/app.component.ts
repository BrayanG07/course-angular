import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enum/auth-status.enum';
import { Router } from '@angular/router';
import { KR_AUTH, KR_AUTH_LOGIN, KR_DASHBOARD } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.CHECKING) {
      return false;
    }

    return true;
  })

  public authStatusChangeEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.CHECKING:
      return;
      case AuthStatus.AUTHENTICATED:
        this.router.navigate([KR_DASHBOARD])
        return;
      case AuthStatus.NOT_AUTENTICATED:
        this.router.navigate([`${KR_AUTH_LOGIN}`])
        return;
      default:
        break;
    }
  })
}
