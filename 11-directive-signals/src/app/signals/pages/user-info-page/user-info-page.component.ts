import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  templateUrl: './user-info-page.component.html',
  styles: ``
})
export class UserInfoPageComponent implements OnInit {
  private userService: UserService = inject(UserService);

  public userId = signal<number>(11);
  public currentUser = signal<User | undefined>(undefined);
  public messageError = signal<string | null>(null);
  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  })

  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser(id: number): void {
    if (id <= 0) return;
    this.currentUser.set(undefined)

    this.userId.set(id);
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.currentUser.set(user);
      },
      error: (error: any) => {
        this.currentUser.set(undefined);

        if (error instanceof HttpErrorResponse) {
          if (error.status === HttpStatusCode.NotFound) {
            this.messageError.set(`Usuario con id ${id} no encontrado`)
          } else if (error.status === HttpStatusCode.NotAcceptable) {
            this.messageError.set('Parametro invalido')
          }
        }
      }
    })
  }
}
