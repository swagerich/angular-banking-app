import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { ClientDto } from '../interfaces/clientDto-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endPoint: string = environments.baseUrl;

  private http = inject(HttpClient);

  getAllClient(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.endPoint}/client`);
  }

  getAllClientByRoleUser(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.endPoint}/client/users`);
  }

  countClientByRoleUser(): Observable<number> {
    return this.http.get<ClientDto[]>(`${this.endPoint}/client/users`).pipe(
      map((user :ClientDto[] ) => user.length)
    );
  }

  deleteClientById(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/client/${userId}`);
  }

  validateAccount(userId: number): Observable<number> {
    return this.http.patch<number>(
      `${this.endPoint}/client/validate/${userId}`,
      {}
    );
  }

  invalidateAccount(userId: number): Observable<number> {
    return this.http.patch<number>(
      `${this.endPoint}/client/invalidate/${userId}`,
      {}
    );
  }

  getAllRoleUserIsActive():Observable<number>{
    return this.http.get<number>(`${this.endPoint}/client/users/active`);
  }

  getAllRoleUserIsInactive():Observable<number>{
    return this.http.get<number>(`${this.endPoint}/client/users/inactive`);
  }
}
