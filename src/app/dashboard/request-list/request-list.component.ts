import { Component, OnInit, Input, Output, EventEmitter, Directive, ViewChildren, QueryList } from '@angular/core';
import { Request } from '../../request';
import { tap,map } from 'rxjs/operators';
import { SortableDirective, SortEvent } from './sortable.directive';

// compare function for string sort
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})

export class RequestListComponent implements OnInit {

  // receive requests from dashboard and emit approve and decline operations
  @Input() requests;
  @Input() status;
  @Output() requestApproved = new EventEmitter<Request>();
  @Output() requestDeclined = new EventEmitter<Request>();
  @Output() statusChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // sorting requests list table
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting requests
    if (direction === '') {
      // sort by date when direction is reset to default
      this.requests = this.requests.pipe(
          tap(
            r => {
              r.sort((a, b) => { return b.created_date-a.created_date; });
            }
          )
      );
    } else {
      // set string column
      this.requests = this.requests.pipe(
          tap(
              r => {
                r.sort((a, b) => {
                  const res = compare(a[column], b[column]);
                  return direction === 'asc' ? res : -res;
                });
              }
          )
      );
    }
  }

}
