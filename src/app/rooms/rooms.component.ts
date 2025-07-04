import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderComponent } from "../layout/header/header.component";
import { LayoutModule } from '../layout/layout.module';
import { BookingStepsComponent } from '../booking-steps/booking-steps.component';

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
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LayoutModule, BookingStepsComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  searchInfo: any;
  sidebarOpen = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.searchInfo = JSON.parse(localStorage.getItem('search') || '{}');
    const allRooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    if (this.searchInfo && this.searchInfo.hotelName) {
      this.rooms = allRooms.filter(
        (room: any) =>
          room.hotel &&
          room.hotel.toLowerCase() === this.searchInfo.hotelName.toLowerCase()
      );
    } else {
      this.rooms = allRooms;
    }
  }

  bookRoom(room: Room) {
    localStorage.setItem('selectedRoom', JSON.stringify(room));
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user || !user.email) {
      localStorage.setItem('redirectAfterLogin', '/contact');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/contact']);
  }

  get nextDay(): string | null {
    if (!this.searchInfo?.checkInDate) return null;
    const date = new Date(this.searchInfo.checkInDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
  }
}
