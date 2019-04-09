import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Request } from '../../request';
import { SortEvent } from '../sortable.directive';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})

export class RequestListComponent implements OnInit {

  // receive requests from dashboard and emit approve and decline operations
  @Input() requests;
  @Input() dashboardStatus;
  @Output() requestApproved = new EventEmitter<Request>();
  @Output() requestDeclined = new EventEmitter<Request>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<SortEvent>();

  constructor() { }

  ngOnInit() {
  }
}
