import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RegisterUser } from '../interfaces/registerUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected http = inject(HttpClient);
  
  registerUser(body: string) {
    return this.http.post<RegisterUser>(`${environment.api}auth/register`, body);
  };
}
