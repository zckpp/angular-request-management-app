import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Request} from '../request';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // postfix dollar sign for observables
  requests$: Observable<Request[]>;
  status: string;
  selectedRequest: Request  = { id :  null, last_name:  null, first_name:  null, email: null, category:  null, manager:  null, status:  null, created_date: null};

  constructor(
      private apiService: ApiService,
      private cookieService: CookieService
  ) { }

  ngOnInit() {
    // start with request list
    this.requests$ = this.getRequest();

    this.cookieValue = this.cookieService.get('Test');
  }

  cookieValue = 'UNKNOWN';

  getRequest() {
    return this.apiService.readRequests().pipe(
        tap(requests => {
          requests.forEach(function (request) {
            // covert mysql datetime into js date
            let t = request.created_date.split(/[- :]/);
            request.created_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
          });
        }),
        tap(requests => { requests.sort((a,b) => { return b.created_date-a.created_date; }); })
    );
  }

  updateRequest(request: Request, value){
    if(this.selectedRequest && this.selectedRequest.id){
      request.id = this.selectedRequest.id;
      request.status = value;
      this.apiService.updateRequest(request).subscribe(response => {
        // You can access status:
        console.log(response);
        // if succeed, update request list view
        if (response == "204") this.changeStatus(this.status);
        else alert("Operation failed on database, pelase try again.");
      });
    }
    // else{
    //   this.apiService.createRequest(form.value).subscribe((request: Request)=>{
    //     console.log("Policy created, ", request);
    //   });
    // }

  }

  approveRequest(request: Request){
    this.selectedRequest = request;
    this.updateRequest(this.selectedRequest, 'approved');
  }
  declineRequest(request: Request){
    this.selectedRequest = request;
    this.updateRequest(this.selectedRequest, 'declined');
  }
  // get different view based on status then pass it down to request list display
  changeStatus(status) {
    this.requests$ = this.getRequest().pipe(
        map(
            (requests) => {
              return requests.filter((request) => { return request.status.includes(status); });
            }
        ),
    );
    this.status = status;
  }


}
