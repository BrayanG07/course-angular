import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../enum/auth-status.enum';
import { KEY_STORAGE_TOKEN } from '../../constants';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';
import { handleErrorHttp } from '../../helpers/handle-error-http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private httpClient = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);

  // * Hacemos esto para que nuestras señales no sean modificadas por el mundo exterior.
  // * Solo podran ser modificadas mediante funciones de esta clase, es decir seran modificadas
  // * Solo si nosotros lo deseamos o permitimos.
  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.httpClient.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => handleErrorHttp(error, 'Se produjo un error al iniciar sesion'))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem(KEY_STORAGE_TOKEN);

    if (!token) {
      this.logout()
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((error) => {
        this._authStatus.set(AuthStatus.NOT_AUTENTICATED);
        return of(false)
      })
    )
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.AUTHENTICATED);
    localStorage.setItem(KEY_STORAGE_TOKEN, token);

    return true;
  }

  logout(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.NOT_AUTENTICATED);
    localStorage.removeItem(KEY_STORAGE_TOKEN);
  }
}
