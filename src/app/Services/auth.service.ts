import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Environment } from '../Environment/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData: any = null;
  customerId: string | null = null;
  userName: string | null = null;

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/Authentication/register`, data);
  }

  setloginForm(data: { Email: string; Password: string; RememberMe: boolean }): Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/Authentication/login`, data);
  }

  saveUserData(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        this.userData = jwtDecode(token);
        this.customerId = localStorage.getItem('userId');
        this.userName = localStorage.getItem('userName');

      } catch (err) {
        console.error('Invalid token:', err);
        this.userData = null;
        this.customerId = null;
        this.userName = null;
        this.logOut();
      }
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName')
    this.userData = null;
    this.customerId = null;
    this.userName = null;
    this._Router.navigate(['/login']);
  }
}


