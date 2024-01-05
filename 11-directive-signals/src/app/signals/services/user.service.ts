import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SingleUserResponse, User } from '../interfaces/user.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://reqres.in/api/users'

  getUserById(id: number): Observable<User> {
    const url: string = `${this.baseUrl}/${id}`

    return this.httpClient.get<SingleUserResponse>(url).pipe(
      map((singleUser) => singleUser.data),
    );
  }
}
