import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environments } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private endPoint: string = environments.baseUrl;


  private http = inject(HttpClient);

  public onExcel(userId:string): Observable<Blob>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ms-excel'
    });
    return  this.http.get<any>(`${this.endPoint}/excel/download?userId=${userId}`,{
      headers:headers,
      responseType: 'blob' as 'json'
    });
  }
}
