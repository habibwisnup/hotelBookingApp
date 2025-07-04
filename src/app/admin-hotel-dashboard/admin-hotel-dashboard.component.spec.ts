import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelDashboardComponent } from './admin-hotel-dashboard.component';

describe('AdminHotelDashboardComponent', () => {
  let component: AdminHotelDashboardComponent;
  let fixture: ComponentFixture<AdminHotelDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHotelDashboardComponent]
    });
    fixture = TestBed.createComponent(AdminHotelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
