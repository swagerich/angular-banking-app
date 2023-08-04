import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  getAllClientByRoleUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endPoint}/client/users`);
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
}
