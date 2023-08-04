import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environments } from 'src/app/environments/environments';
import { TransactionDto } from '../interfaces/transactionDto-interface';
import { TransactionDtoPageByUser } from '../interfaces/transactionDtoPage-interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
  private endPoint: string = environments.baseUrl;

  private http = inject(HttpClient);

  saveTransaction(transactionDto: TransactionDto): Observable<TransactionDto> {
    return this.http.post<TransactionDto>(
      `${this.endPoint}/transaction`,
      transactionDto
    );
  }

  findTransactionById(tId: number): Observable<TransactionDto> {
    return this.http.get<TransactionDto>(`${this.endPoint}/transaction/${tId}`);
  }

  deleteTransactionById(tId: number): void {
    this.http.delete<TransactionDto>(`${this.endPoint}/transaction/${tId}`);
  }

  transactionAllPageByUser(userId:number,page:number,size:number): Observable<TransactionDtoPageByUser> {
    return this.http.get<TransactionDtoPageByUser>(`${this.endPoint}/transaction/page?userId=${userId}&page=${page}&size=${size}`);
  }
}
