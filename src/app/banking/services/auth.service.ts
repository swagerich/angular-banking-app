import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginDto } from '../interfaces/loginDto-interface';
import { ClientDto } from '../interfaces/clientDto-interface';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface requestTokenDto {
  accessToken: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginStatusBehaviorSubject = new BehaviorSubject<boolean>(false);
  private endPoint: string = 'http://localhost:8080/auth';

  private router = inject(Router);

  private http = inject(HttpClient);

  login(login: LoginDto): Observable<requestTokenDto> {
    return this.http.post<requestTokenDto>(`${this.endPoint}/login`, login);
  }

  signup(client: ClientDto): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/register`, client);
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

  isTokenExpiret():boolean{
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired();
    if(isTokenExpired){
      localStorage.clear();
      return false;
    }
    return false;
  }
  
  getUser() {
    let userStrg = localStorage.getItem('user');
    if (userStrg != null) {
      return JSON.parse(userStrg);
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
