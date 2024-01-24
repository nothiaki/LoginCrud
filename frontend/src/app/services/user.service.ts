import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

interface RegisterUserResponse {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected http = inject(HttpClient);
  
  registerUser(body: string) {
    return this.http.post<RegisterUserResponse>(`${environment.api}auth/register`, body);
  };
}
