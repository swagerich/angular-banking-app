import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginDto } from '../interfaces/loginDto-interface';
import { ClientDto } from '../interfaces/clientDto-interface';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface jwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatusBehaviorSubject = new BehaviorSubject<boolean>(false);
  private endPoint: string = 'http://localhost:8080/auth';

  private router = inject(Router);

  private http = inject(HttpClient);

  login(login: LoginDto): Observable<jwtResponse> {
    return this.http.post<jwtResponse>(`${this.endPoint}/login`, login);
  }

  signup(client: ClientDto): Observable<jwtResponse> {
    return this.http.post<jwtResponse>(`${this.endPoint}/register`, client);
  }

  saveRefreshToken(refresh:string) : Observable<jwtResponse>{
    let body = { token : refresh }
    return this.http.post<jwtResponse>(`${this.endPoint}/refresh`,body);
  }

 /*  currentUser(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/current-user`);
  } */

  setToken(accessToken: string): boolean {
    localStorage.setItem('accessToken', accessToken);
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setRefreshToken(refreshToken: string) : boolean {
    localStorage.setItem('refreshToken', refreshToken);
    return true;
  }

  getRefreshToken(): string | null{
    return localStorage.getItem('refreshToken');
  }

  setUser(user: string) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.clear();
    this.loginStatusBehaviorSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean | any {
    let tokenString = localStorage.getItem('accessToken');
    if (tokenString == undefined || tokenString == '' || tokenString == null) {
      return false;
    } else {
      return true;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(token);
  }
  
  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
