import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Request} from '../../request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  // tsc make sure video has the Video format
  @Input() requests: Request[];

  @Output() requestApproved = new EventEmitter<Request>();
  @Output() requestDeclined = new EventEmitter<Request>();

  constructor() { }

  ngOnInit() {
  }

}
