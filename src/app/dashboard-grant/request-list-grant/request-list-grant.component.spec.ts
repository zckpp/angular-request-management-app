import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListGrantComponent } from './request-list-grant.component';

describe('RequestListGrantComponent', () => {
  let component: RequestListGrantComponent;
  let fixture: ComponentFixture<RequestListGrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestListGrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
