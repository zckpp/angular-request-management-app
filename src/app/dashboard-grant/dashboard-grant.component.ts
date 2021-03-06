import { Component, OnInit, Directive, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../api.service';
import { SortableDirective, SortEvent, Compare } from '../sortable.directive';
import { Request } from '../request';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-grant',
  templateUrl: './dashboard-grant.component.html',
  styleUrls: ['./dashboard-grant.component.scss']
})
export class DashboardGrantComponent implements OnInit {

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
    this.requests$ = this.getRequest();
    this.changeStatus("approved");
    this.auth = this.cookieService.get('angular-php-sar');
    console.log(this.auth);
    this.user_email = this.cookieService.get('email_cookie');
  }

  // methods
  // only need status with "approved" or "granted"
  getRequest() {
    return this.apiService.readRequests().pipe(
        map(
            (requests) => {
              return requests.filter((request) => { return (request.status.includes('granted') || request.status.includes('approved')); });
            }
        ),
    );
  }

  updateRequest(request: Request, value){
    request.id = request.id;
    request.status = value;
    // use any here so that the condition statement won't generate error
    this.apiService.updateRequest(request).subscribe((response: any) => {
      // status response configured in php app
      console.log(response);
      // if succeed, then update request list view
      if (response.status == "succeed") {
        this.changeStatus(this.dashboardStatus);
        this.snackBar.open('Request is granted!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'grant'
        });
      }
      else alert("Operation failed on database, please try again.");
    });
  }

  grantRequest(request: Request){
    this.updateRequest(request, 'granted');
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

  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
}
