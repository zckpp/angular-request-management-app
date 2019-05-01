import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListSearchComponent } from './request-list-search.component';

describe('RequestListSearchComponent', () => {
  let component: RequestListSearchComponent;
  let fixture: ComponentFixture<RequestListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
