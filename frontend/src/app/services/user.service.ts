import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

interface AuthUserResponse {
  message: string,
  token: string,
  user: {
    username: string,
    email: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn: boolean = false;

  private http = inject(HttpClient);
  
  registerUser(body: string) {
    return this.http.post<AuthUserResponse>(`${environment.api}auth/register`, body);
  };

  loginUser(body: string) {
    return this.http.post<AuthUserResponse>(`${environment.api}auth/login`, body);
  };

  setUserLoggedIn(): boolean {
    return this.isUserLoggedIn = true;
  }

  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
}
