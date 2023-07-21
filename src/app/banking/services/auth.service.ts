import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../interfaces/loginDto-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint:string = '/auth/login';

  private http= inject(HttpClient);

  login(login:LoginDto):Observable<LoginDto>{
    return this.http.post<LoginDto>(`${this.endPoint}`,login);
  }
}
