import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', 'b4d3833b-0e64-4a6f-86e3-9446ec558ebc'))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(error => of(false))
    );
  }

}
