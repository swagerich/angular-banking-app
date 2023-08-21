import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AddressDto } from '../interfaces/addressDto-interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private endPoint: string = environments.baseUrl;

  constructor(private _http: HttpClient) {}

  saveAddressByUserId(address: AddressDto): Observable<AddressDto> {
    return this._http.post<AddressDto>(`${this.endPoint}/address`, address);
  }

  findAddresByUserId(userId: number): Observable<AddressDto> {
    return this._http.get<AddressDto>(
      `${this.endPoint}/address/user/${userId}`
    );
  }

  existsByUserId(userId: number): Observable<Boolean> {
    return this._http
      .get<Boolean>(`${this.endPoint}/address/exists/${userId}`)
      .pipe(catchError(() => {
          return of(false);
        })
      );
  }
}
