import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../layout/header/header.component";
import { LayoutModule } from '../layout/layout.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LayoutModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  upcomingBookings: any[] = [];
  pastBookings: any[] = [];

  sidebarOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.user || !this.user.email) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.user.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    }
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const today = new Date().toISOString().split('T')[0];

    this.upcomingBookings = allBookings.filter((b: any) => b.checkInDate >= today);
    this.pastBookings = allBookings.filter((b: any) => b.checkInDate < today);
  }

  cancelBooking(booking: any) {
    let allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    allBookings = allBookings.filter((b: any) => b.checkInDate !== booking.checkInDate || b.room.name !== booking.room.name);
    localStorage.setItem('bookings', JSON.stringify(allBookings));
    this.ngOnInit();
    alert('Booking cancelled.');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  addBooking(newBooking: any) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}