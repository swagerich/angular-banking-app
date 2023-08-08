import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { TransactionSumaDetails } from '../interfaces/transactionSumaDetais';

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
}
