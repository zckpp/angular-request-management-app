import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from  './request';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1/angular-php/backend/api";
  constructor(private httpClient: HttpClient) {}

  readRequests(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  createRequest(request: Request): Observable<Request>{
    return this.httpClient.post<Request>(`${this.PHP_API_SERVER}/create.php`, request);
  }

  updateRequest(request: Request){
    return this.httpClient.put<Request>(`${this.PHP_API_SERVER}/update.php`, request);
  }

  deleteRequest(id: number){
    return this.httpClient.delete<Request>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
  }

}
