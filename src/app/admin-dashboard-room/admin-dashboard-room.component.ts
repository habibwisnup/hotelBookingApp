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
  selector: 'app-admin-hotel-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard-room.component.html',
  styleUrls: ['./admin-dashboard-room.component.css']
})
export class AdminDashboardRoomComponent implements OnInit {
  hotels: Hotel[] = [];
  rooms: Room[] = [];

  totalBooking: number = 0;
  availableRoomCount: number = 0;

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

  randomImages: string[] = [
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/26139/pexels-photo.jpg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&w=1440&h=470&fit=crop',
    'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&w=1440&h=470&fit=crop'
  ];

  selectedHotel: string | null = null;

  errorMessage: string = '';

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
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.totalBooking = allBookings.length;
    this.availableRoomCount = this.rooms.filter(r => r.available).length;
  }

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  saveHotels() {
    localStorage.setItem('hotels', JSON.stringify(this.hotels));
  }

  saveRooms() {
    localStorage.setItem('rooms', JSON.stringify(this.rooms));
    this.availableRoomCount = this.rooms.filter(r => r.available).length;
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
    this.errorMessage = '';
    if (!this.selectedHotel) {
      this.errorMessage = 'Please select a hotel.';
      return;
    }
    if (!this.newRoomName.trim()) {
      this.errorMessage = 'Please enter a room name.';
      return;
    }
    if (!this.newRoomDescription.trim()) {
      this.errorMessage = 'Please enter a description.';
      return;
    }
    if (!this.newRoomPrice || isNaN(Number(this.newRoomPrice)) || Number(this.newRoomPrice) <= 0) {
      this.errorMessage = 'Please enter a valid price.';
      return;
    }
    if (!this.newRoomGuestCount || isNaN(Number(this.newRoomGuestCount)) || Number(this.newRoomGuestCount) < 1) {
      this.errorMessage = 'Please enter a valid guest count.';
      return;
    }
    if (!this.newRoomDateStart) {
      this.errorMessage = 'Please select a start date.';
      return;
    }
    if (!this.newRoomDateEnd) {
      this.errorMessage = 'Please select an end date.';
      return;
    }
    if (
      this.newRoomName.trim() &&
      this.selectedHotel &&
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
        hotel: this.selectedHotel,
        available: true,
        price: Number(this.newRoomPrice),
        description: this.newRoomDescription,
        imageUrl: this.newRoomImageUrl && this.newRoomImageUrl.trim() ? this.newRoomImageUrl.trim() : this.getRandomImageFromSix(),
        rating: this.newRoomRating,
        reviewsCount: this.newRoomReviewsCount,
        guestCount: Number(this.newRoomGuestCount),
        availableDates
      });

      this.newRoomName = '';
      this.newRoomPrice = '';
      this.newRoomDescription = '';
      this.newRoomImageUrl = '';
      this.newRoomRating = 4.5;
      this.newRoomReviewsCount = 10;
      this.newRoomGuestCount = '';
      this.newRoomDateStart = '';
      this.newRoomDateEnd = '';
      this.saveRooms();
      this.availableRoomCount = this.rooms.filter(r => r.available).length;
      this.errorMessage = '';
    }
  }

  removeRoom(index: number) {
    this.rooms.splice(index, 1);
    this.saveRooms();
    this.availableRoomCount = this.rooms.filter(r => r.available).length;
  }

  toggleHotelReady(hotel: Hotel) {
    hotel.ready = !hotel.ready;
    this.saveHotels();
  }

  toggleRoomAvailable(room: Room) {
    room.available = !room.available;
    this.saveRooms();
    this.availableRoomCount = this.rooms.filter(r => r.available).length;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
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

  getRandomImages(n: number): string[] {
    const shuffled = this.randomImages
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled.slice(0, n);
  }

  getRandomImageFromSix(): string {
    const sixImages = this.getRandomImages(6);
    const idx = Math.floor(Math.random() * sixImages.length);
    return sixImages[idx];
  }

  get filteredRooms() {
    if (!this.selectedHotel) return this.rooms;
    return this.rooms.filter(room => room.hotel === this.selectedHotel);
  }

  onHotelChange(hotelName: string) {
    this.selectedHotel = hotelName;
  }
}
