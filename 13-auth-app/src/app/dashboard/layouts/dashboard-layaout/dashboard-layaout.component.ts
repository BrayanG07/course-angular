import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layaout.component.html',
  styleUrl: './dashboard-layaout.component.css'
})
export class DashboardLayaoutComponent {
  private authService = inject(AuthService)
  public user = computed(() => this.authService.currentUser())

  // get user(): User | null {
  //   return this.authService.currentUser()
  // }

  onLogout(): void {
    this.authService.logout();
  }
}
