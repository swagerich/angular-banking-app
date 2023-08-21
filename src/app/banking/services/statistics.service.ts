import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environment';
import { TransactionSumaDetails } from '../interfaces/transactionSumaDetais';
import { UsuariosDetails } from '../interfaces/usuariosDetails';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  
  private endPoint: string = environments.baseUrl;

  private http = inject(HttpClient);
 
  public getTransactionBetwenDate(userId:number,startDate:string,lastDate:string):Observable<TransactionSumaDetails[]>{
    return this.http.get<TransactionSumaDetails[]>(`${this.endPoint}/statistics/sum-date/${userId}?start-date=${startDate}&last-date=${lastDate}`);
  }

  public getHighTransaction(userId:number):Observable<number>{
    return this.http.get<number>(`${this.endPoint}/statistics/high-tranfer/${userId}`);
  }

  public getHighDeposito(userId:number):Observable<number>{
    return this.http.get<number>(`${this.endPoint}/statistics/high-deposit/${userId}`);
  }

  public getAccountAmount(userId:number):Observable<number>{
    return this.http.get<number>(`${this.endPoint}/statistics/amount-max/${userId}`);
  }

  public countClientsByDate(startDate:string,lastDate:string):Observable<UsuariosDetails[]>{
    return this.http.get<UsuariosDetails[]>(`${this.endPoint}/statistics/users?start-date=${startDate}&last-date=${lastDate}`);
  }
}
