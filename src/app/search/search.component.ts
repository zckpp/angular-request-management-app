import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../api.service';
import { Request } from '../request';
import { map, tap, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // postfix dollar sign for observables
  requests$: Observable<Request[]>;
  term$: Observable<string>;
  auth: string = "false";
  user_email: string;
  termFilter = new FormControl('');

  constructor(
      private apiService: ApiService,
      private cookieService: CookieService,
  ) { }

  ngOnInit() {
    // only show granted requests in this dashboard
    this.changeStatus("granted");
    this.auth = this.cookieService.get('angular-php-sar');
    this.user_email = this.cookieService.get('email_cookie');
    // use switchMap to combine two observables
    this.requests$ = this.termFilter.valueChanges
        .pipe(
            startWith<string>(""),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(term => this.apiService.searchRequests(term)
                .pipe(
                    map(
                        (requests) => {
                          return requests.filter((request) => { return request.status.includes("granted"); });
                        }
                    ),
                )
            ),
        );
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
  }

  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
}
