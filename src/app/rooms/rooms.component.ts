import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderComponent } from "../layout/header/header.component";
import { LayoutModule } from '../layout/layout.module';

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
  imports: [CommonModule, FormsModule, HeaderComponent, LayoutModule],
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
    const allRooms: Room[] = JSON.parse(localStorage.getItem('rooms') || '[]');
    const hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    const readyHotels = hotels.filter((h: any) => h.ready).map((h: any) => h.name);

    this.rooms = allRooms.filter(room =>
      room.available &&
      readyHotels.includes(room.hotel) &&
      room.availableDates?.includes(this.searchInfo.checkInDate) &&
      room.guestCount >= this.searchInfo.guestCount
    );
  }

  bookRoom(room: Room) {
    localStorage.setItem('selectedRoom', JSON.stringify(room));
    this.router.navigate(['/contact']);
  }

  get nextDay(): string | null {
    if (!this.searchInfo?.checkInDate) return null;
    const date = new Date(this.searchInfo.checkInDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
}
