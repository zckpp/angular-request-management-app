import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from  './request';
import { Observable } from  'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1/angular-php/backend/api";
  constructor(private httpClient: HttpClient) {}

  readRequests(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.PHP_API_SERVER}/read.php`).pipe(
        tap(requests => {
          requests.forEach(function (request) {
            // covert mysql datetime into js date
            let t = request.created_date.split(/[- :]/);
            request.created_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
            let gt = request.granted_date.split(/[- :]/);
            request.granted_date = new Date(Date.UTC(gt[0], gt[1]-1, gt[2], gt[3], gt[4], gt[5]));
          });
        }),
        // sort by created date
        tap(requests => { requests.sort((a,b) => { return b.created_date-a.created_date; }); })
    );
  }

  searchRequests(term: string): Observable<Request[]>{
    return this.httpClient.post<Request[]>(`${this.PHP_API_SERVER}/read.php`, term).pipe(
        tap(requests => {
          requests.forEach(function (request) {
            // covert mysql datetime into js date
            let t = request.created_date.split(/[- :]/);
            request.created_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
            let gt = request.granted_date.split(/[- :]/);
            request.granted_date = new Date(Date.UTC(gt[0], gt[1]-1, gt[2], gt[3], gt[4], gt[5]));
          });
        }),
        // sort by granted date
        tap(requests => { requests.sort((a,b) => { return b.granted_date-a.granted_date; }); })
    );
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
