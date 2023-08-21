import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environment';
import { ContactDto } from '../interfaces/contactDto-interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  private endPoint: string = environments.baseUrl;

  private http = inject(HttpClient);


  saveContact(contact:ContactDto):Observable<ContactDto>{
    return this.http.post<ContactDto>(`${this.endPoint}/contact`,contact);
  }

  findByContactId(contactId : number):Observable<ContactDto>{
    return this.http.get<ContactDto>(`${this.endPoint}/contact/${contactId}`);
  }

  findAllContact():Observable<ContactDto[]>{
    return this.http.get<ContactDto[]>(`${this.endPoint}/contact`);
  }
  deleteContactById(id:number):Observable<void>{
   return this.http.delete<void>(`${this.endPoint}/contact/${id}`);
  }

  findAllContactByUserId(userId:number):Observable<ContactDto[]>{
    return this.http.get<ContactDto[]>(`${this.endPoint}/contact/all/${userId}`);
  }
}
