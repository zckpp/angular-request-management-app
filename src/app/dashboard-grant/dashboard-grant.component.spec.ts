import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGrantComponent } from './dashboard-grant.component';

describe('DashboardGrantComponent', () => {
  let component: DashboardGrantComponent;
  let fixture: ComponentFixture<DashboardGrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
