import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ApiService } from '../api.service';
import { Request } from '../request';

import { PageEvent } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
import { map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    // postfix dollar sign for observables
    requests$: Observable<Request[]>;
    auth: string = "false";
    user_email: string;
    termFilter = new FormControl('');

    constructor(
        private apiService: ApiService,
        private cookieService: CookieService,
    ) { }

    ngOnInit() {
        this.auth = this.cookieService.get('angular-php-sar');
        this.user_email = this.cookieService.get('email_cookie');
        // use switchMap to combine two observables
        this.requests$ = this.termFilter.valueChanges
            .pipe(
                //start with empty string to show all result
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

    // MatPaginator Output
    pageEvent: PageEvent;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25];
}
