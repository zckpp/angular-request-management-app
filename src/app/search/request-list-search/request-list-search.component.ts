import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Request } from '../../request';
import { SortEvent } from '../../sortable.directive';

@Component({
  selector: 'app-request-list-search',
  templateUrl: './request-list-search.component.html',
  styleUrls: ['./request-list-search.component.scss']
})
export class RequestListSearchComponent implements OnInit {

  // receive requests from dashboard and emit approve and decline operations
  @Input() requests;
  @Input() pageSize;
  @Input() pageIndex;

  constructor() { }

  ngOnInit() {
  }

}
