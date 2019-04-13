import { Component, OnInit, Directive, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../api.service';
import { SortableDirective, SortEvent, Compare } from '../sortable.directive';
import { Request } from '../request';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // variables

  // postfix dollar sign for observables
  requests$: Observable<Request[]>;
  dashboardStatus: string;
  auth: string = "false";
  user_email: string;

  constructor(
      private apiService: ApiService,
      private cookieService: CookieService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // start with request list with pending status
    this.requests$ = this.apiService.readRequests();
    this.changeStatus("pending");
    this.auth = this.cookieService.get('angular-php-sar');
    console.log(this.auth);
    this.user_email = this.cookieService.get('email_cookie');
  }

  // methods
  updateRequest(request: Request, value){
    request.status = value;
    // use any here so that the condition statement won't generate error
    this.apiService.updateRequest(request).subscribe((response: any) => {
      // status response configured in php app
      console.log(response);
      // if succeed, then update request list view
      if (response == "204") {
        this.changeStatus(this.dashboardStatus);
        if ('approved' === value) {
          this.snackBar.open('Request is approved!', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'approve'
          });
        } else if ('declined' === value) {
          this.snackBar.open('Request is declined!', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'decline'
          });
        }
      }
      else alert("Operation failed on database, please try again.");
    });
  }

  approveRequest(request: Request){
    this.updateRequest(request, 'approved');
  }

  declineRequest(request: Request){
    this.updateRequest(request, 'declined');
  }

  // get different view based on status then pass it down to request list display
  changeStatus(status) {
    this.requests$ = this.apiService.readRequests().pipe(
        map(
            (requests) => {
              return requests.filter((request) => { return request.status.includes(status); });
            }
        ),
    );
    this.dashboardStatus = status;
  }

  // sort requests
  // sorting requests list table
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  sortRequests({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting requests
    if (direction === '') {
      // sort by date when direction is reset to default
      this.requests$ = this.requests$.pipe(
          tap(
              (r: any[]) => {
                r.sort((a, b) => { return b.created_date-a.created_date; });
              }
          )
      );
    } else {
      // set string column
      this.requests$ = this.requests$.pipe(
          tap(
              (r: any[]) => {
                r.sort((a, b) => {
                  const res = Compare(a[column], b[column]);
                  return direction === 'asc' ? res : -res;
                });
              }
          )
      );
    }
  }

}
