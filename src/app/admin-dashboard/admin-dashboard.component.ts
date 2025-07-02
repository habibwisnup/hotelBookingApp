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

  constructor(private router: Router) {
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
  }

  saveHotels() {
    localStorage.setItem('hotels', JSON.stringify(this.hotels));
  }

  saveRooms() {
    localStorage.setItem('rooms', JSON.stringify(this.rooms));
  }

  addHotel() {
    if (this.newHotelName.trim()) {
      this.hotels.push({ name: this.newHotelName.trim(), ready: true });
      this.newHotelName = '';
      this.saveHotels();
    }
  }

  removeHotel(index: number) {
    const hotelName = this.hotels[index].name;
    this.hotels.splice(index, 1);
    this.saveHotels();
    this.rooms = this.rooms.filter(room => room.hotel !== hotelName);
    this.saveRooms();
  }

  addAvailableDate() {
    if (this.newRoomDateInput && !this.newRoomAvailableDatesArr.includes(this.newRoomDateInput)) {
      this.newRoomAvailableDatesArr.push(this.newRoomDateInput);
      this.newRoomDateInput = '';
    }
  }

  removeAvailableDate(date: string) {
    this.newRoomAvailableDatesArr = this.newRoomAvailableDatesArr.filter(d => d !== date);
  }

  addAvailableDateRange() {
    if (this.newRoomDateStart && this.newRoomDateEnd) {
      const start = new Date(this.newRoomDateStart);
      const end = new Date(this.newRoomDateEnd);
      const dates: string[] = [];
      for (
        let d = new Date(start);
        d <= end;
        d.setDate(d.getDate() + 1)
      ) {
        const iso = d.toISOString().split('T')[0];
        if (!this.newRoomAvailableDatesArr.includes(iso)) {
          dates.push(iso);
        }
      }
      this.newRoomAvailableDatesArr.push(...dates);
      this.newRoomDateStart = '';
      this.newRoomDateEnd = '';
    }
  }

  addRoom() {
    if (
      this.newRoomName.trim() &&
      this.newRoomHotel &&
      this.newRoomDateStart &&
      this.newRoomDateEnd
    ) {
      const start = new Date(this.newRoomDateStart);
      const end = new Date(this.newRoomDateEnd);
      const availableDates: string[] = [];
      for (
        let d = new Date(start);
        d <= end;
        d.setDate(d.getDate() + 1)
      ) {
        availableDates.push(d.toISOString().split('T')[0]);
      }

      this.rooms.push({
        name: this.newRoomName.trim(),
        hotel: this.newRoomHotel,
        available: true,
        price: Number(this.newRoomPrice),
        description: this.newRoomDescription,
        imageUrl: this.newRoomImageUrl.trim() || 'https://i.pinimg.com/736x/c9/3d/77/c93d7790a66b4876704e597152444f1c.jpg',
        rating: this.newRoomRating,
        reviewsCount: this.newRoomReviewsCount,
        guestCount: Number(this.newRoomGuestCount),
        availableDates
      });

      this.newRoomName = '';
      this.newRoomHotel = null;
      this.newRoomPrice = '';
      this.newRoomDescription = '';
      this.newRoomImageUrl = '';
      this.newRoomRating = 4.5;
      this.newRoomReviewsCount = 10;
      this.newRoomGuestCount = '';
      this.newRoomDateStart = '';
      this.newRoomDateEnd = '';
      this.saveRooms();
    }
  }

  removeRoom(index: number) {
    this.rooms.splice(index, 1);
    this.saveRooms();
  }

  toggleHotelReady(hotel: Hotel) {
    hotel.ready = !hotel.ready;
    this.saveHotels();
  }

  toggleRoomAvailable(room: Room) {
    room.available = !room.available;
    this.saveRooms();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  formatDateRange(dates: string[]): string {
    if (!dates || dates.length === 0) return '-';
    const start = dates[0];
    const end = dates[dates.length - 1];
    const toMDY = (iso: string) => {
      const d = new Date(iso);
      return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
    };
    return `${toMDY(start)} - ${toMDY(end)}`;
  }

  startEditHotel(i: number) {
    this.editHotelIndex = i;
    this.editHotelName = this.hotels[i].name;
  }
  saveEditHotel(i: number) {
    if (this.editHotelName.trim()) {
      const oldName = this.hotels[i].name;
      this.hotels[i].name = this.editHotelName.trim();
      this.rooms.forEach(room => {
        if (room.hotel === oldName) room.hotel = this.editHotelName.trim();
      });
      this.saveHotels();
      this.saveRooms();
      this.editHotelIndex = null;
      this.editHotelName = '';
    }
  }
  cancelEditHotel() {
    this.editHotelIndex = null;
    this.editHotelName = '';
  }

  startEditRoom(i: number) {
    this.editRoomIndex = i;
    const room = this.rooms[i];
    this.editRoomName = room.name;
    this.editRoomHotel = room.hotel;
    this.editRoomPrice = room.price.toString();
    this.editRoomGuestCount = room.guestCount.toString();
    this.editRoomDescription = room.description;
    this.editRoomAvailableDates = [...room.availableDates];
    this.editRoomDateStart = '';
    this.editRoomDateEnd = '';
  }
  saveEditRoom(i: number) {
    if (
      this.editRoomName.trim() &&
      this.editRoomHotel &&
      this.editRoomPrice &&
      this.editRoomGuestCount &&
      this.editRoomDescription
    ) {
      const room = this.rooms[i];
      room.name = this.editRoomName.trim();
      room.hotel = this.editRoomHotel;
      room.price = Number(this.editRoomPrice);
      room.guestCount = Number(this.editRoomGuestCount);
      room.description = this.editRoomDescription;
      room.availableDates = [...this.editRoomAvailableDates];
      this.saveRooms();
      this.editRoomIndex = null;
      this.editRoomName = '';
      this.editRoomHotel = null;
      this.editRoomPrice = '';
      this.editRoomGuestCount = '';
      this.editRoomDescription = '';
      this.editRoomAvailableDates = [];
      this.editRoomDateStart = '';
      this.editRoomDateEnd = '';
    }
  }
  cancelEditRoom() {
    this.editRoomIndex = null;
    this.editRoomName = '';
    this.editRoomHotel = null;
    this.editRoomPrice = '';
    this.editRoomGuestCount = '';
    this.editRoomDescription = '';
    this.editRoomAvailableDates = [];
    this.editRoomDateStart = '';
    this.editRoomDateEnd = '';
  }

  addEditRoomDateRange() {
    if (this.editRoomDateStart && this.editRoomDateEnd) {
      this.editRoomAvailableDates = [
        this.editRoomDateStart,
        this.editRoomDateEnd
      ];
      this.editRoomDateStart = '';
      this.editRoomDateEnd = '';
    }
  }

  removeEditRoomAvailableDate(date: string) {
    this.editRoomAvailableDates = this.editRoomAvailableDates.filter(d => d !== date);
  }
}
