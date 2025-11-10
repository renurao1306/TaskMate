import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginModel, UserRegistrationModel } from '../../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient){}

  registerUser(payload: any) {
    return this.http.post<UserRegistrationModel>(`http://localhost:5000/api/users/register`, payload);
  }

  loginUser(payload: any) {
    return this.http.post<UserLoginModel>(`http://localhost:5000/api/users/login`, payload);
  }
}
