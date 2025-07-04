import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface Hotel {
  name: string;
  ready: boolean;
}
interface Room {
  name: string;
  hotel: string;
  available: boolean;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  guestCount: number;
  availableDates: string[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  hotels: Hotel[] = [];
  rooms: Room[] = [];

  totalBooking: number = 0;
  availableRoomCount: number = 0;
  totalUser: number = 0;

  newHotelName = '';
  newRoomName = '';
  newRoomHotel: string | null = null;
  newRoomPrice = '';
  newRoomDescription = '';
  newRoomImageUrl = '';
  newRoomRating = 4.5;
  newRoomReviewsCount = 10;
  newRoomGuestCount = '';
  newRoomAvailableDatesArr: string[] = [];
  newRoomDateInput: string = '';
  newRoomDateStart: string = '';
  newRoomDateEnd: string = '';

  editHotelIndex: number | null = null;
  editHotelName: string = '';

  editRoomIndex: number | null = null;
  editRoomName: string = '';
  editRoomHotel: string | null = null;
  editRoomPrice: string = '';
  editRoomGuestCount: string = '';
  editRoomDescription: string = '';
  editRoomAvailableDates: string[] = [];
  editRoomDateStart: string = '';
  editRoomDateEnd: string = '';

  constructor(
    private router: Router
  ) {
    this.hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    this.rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
  }

  ngOnInit(): void {
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
    this.availableRoomCount = this.rooms.filter(r => r.available).length;

  }

  toggleHotelReady(hotel: Hotel) {
    hotel.ready = !hotel.ready;
  }

  toggleRoomAvailable(room: Room) {
    room.available = !room.available;
    this.availableRoomCount = this.rooms.filter(r => r.available).length;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }
   navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
