import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressDto } from '../interfaces/addressDto-interface';
import { environments } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  private endPoint: string = environments.baseUrl;

  constructor(private _http:HttpClient) { }


  saveAddressByUserId(address:AddressDto):Observable<AddressDto>{
    return this._http.post<AddressDto>(`${this.endPoint}/address`,address);
  }

  findAddresById(userId:number):Observable<AddressDto>{
    return this._http.get<AddressDto>(`${this.endPoint}/address/user/${userId}`);
  }
}
