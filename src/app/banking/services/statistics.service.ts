import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  
  private endPoint: string = environments.baseUrl;

  private http = inject(HttpClient);


  public getStatistcAmount(userId:number):Observable<number>{
    return this.http.get<number>(`${this.endPoint}/statistics/amount-max/${userId}`);
  }
}
