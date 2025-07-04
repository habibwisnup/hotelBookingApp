import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardRoomComponent } from './admin-dashboard-room.component';

describe('AdminDashboardRoomComponent', () => {
  let component: AdminDashboardRoomComponent;
  let fixture: ComponentFixture<AdminDashboardRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardRoomComponent]
    });
    fixture = TestBed.createComponent(AdminDashboardRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
