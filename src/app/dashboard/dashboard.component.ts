import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Request} from '../request';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  requests: Request[];
  selectedRequest:  Request  = { id :  null, last_name:  null, first_name:  null, email: null, category:  null, manager:  null, status:  null};

  constructor(
      private apiService: ApiService,
      private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.apiService.readRequests().subscribe((requests: Request[])=>{
      this.requests = requests;
      console.log(this.requests);

      this.cookieValue = this.cookieService.get('Test');
    })
  }

  cookieValue = 'UNKNOWN';

  updateRequest(request: Request, value){
    if(this.selectedRequest && this.selectedRequest.id){
      request.id = this.selectedRequest.id;
      request.status = value;
      this.apiService.updateRequest(request).subscribe(response => {
        // You can access status:
        console.log(response);
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
    this.updateRequest(this.selectedRequest, 'approve');
  }
  declineRequest(request: Request){
    this.selectedRequest = request;
    this.updateRequest(this.selectedRequest, 'decline');
  }
}
