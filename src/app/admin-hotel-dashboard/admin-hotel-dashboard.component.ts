import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Hotel {
  name: string;
  ready: boolean;
  address?: string;
  phone?: string;
  description?: string;
}

@Component({
  selector: 'app-admin-hotel-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-hotel-dashboard.component.html',
  styleUrls: ['./admin-hotel-dashboard.component.css']
})
export class AdminHotelDashboardComponent implements OnInit {
  hotels: Hotel[] = [];
  totalBooking: number = 0;

  newHotelName = '';
  newHotelAddress = '';
  newHotelPhone = '';
  newHotelDescription = '';

  editHotelIndex: number | null = null;
  editHotelName: string = '';
  editHotelAddress: string = '';
  editHotelPhone: string = '';
  editHotelDescription: string = '';

  constructor(private router: Router) {
    this.hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
  }

  ngOnInit(): void {
    console.log(this.hotels);
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user || !user.email) {
      this.router.navigate(['/login']);
      return;
    }
    if (user.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return;
    }
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.totalBooking = allBookings.length;
  }

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  saveHotels() {
    localStorage.setItem('hotels', JSON.stringify(this.hotels));
  }

  addHotel() {
    if (this.newHotelName.trim()) {
      this.hotels.push({
        name: this.newHotelName.trim(),
        ready: true,
        address: this.newHotelAddress.trim(),
        phone: this.newHotelPhone.trim(),
        description: this.newHotelDescription.trim()
      });
      this.newHotelName = '';
      this.newHotelAddress = '';
      this.newHotelPhone = '';
      this.newHotelDescription = '';
      this.saveHotels();
    }
  }

  removeHotel(index: number) {
    this.hotels.splice(index, 1);
    this.saveHotels();
  }

  toggleHotelReady(hotel: Hotel) {
    hotel.ready = !hotel.ready;
    this.saveHotels();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  startEditHotel(i: number) {
    this.editHotelIndex = i;
    this.editHotelName = this.hotels[i].name;
    this.editHotelAddress = this.hotels[i].address || '';
    this.editHotelPhone = this.hotels[i].phone || '';
    this.editHotelDescription = this.hotels[i].description || '';
  }
  saveEditHotel(i: number) {
    if (this.editHotelName.trim()) {
      this.hotels[i].name = this.editHotelName.trim();
      this.hotels[i].address = this.editHotelAddress.trim();
      this.hotels[i].phone = this.editHotelPhone.trim();
      this.hotels[i].description = this.editHotelDescription.trim();
      this.saveHotels();
      this.editHotelIndex = null;
      this.editHotelName = '';
      this.editHotelAddress = '';
      this.editHotelPhone = '';
      this.editHotelDescription = '';
    }
  }
  cancelEditHotel() {
    this.editHotelIndex = null;
    this.editHotelName = '';
    this.editHotelAddress = '';
    this.editHotelPhone = '';
    this.editHotelDescription = '';
  }

  openManageRoom(hotel: Hotel) {
    this.router.navigate(['/admin-dashboard-room'], { queryParams: { hotel: hotel.name } });
  }
}
