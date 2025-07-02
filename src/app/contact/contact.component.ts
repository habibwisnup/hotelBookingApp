import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../layout/header/header.component";
import { LayoutModule } from '../layout/layout.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LayoutModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  title = 'Mr.';
  name = '';
  email = '';
  room = JSON.parse(localStorage.getItem('selectedRoom') || '{}');
  searchInfo = JSON.parse(localStorage.getItem('search') || '{}');
  sidebarOpen = false;
  useRegisteredData = false;

  constructor(private router: Router) {}

  proceed() {
    const booking = {
      title: this.title,
      name: this.name,
      email: this.email,
      room: this.room,
      checkInDate: this.searchInfo.checkInDate,
      guestCount: this.searchInfo.guestCount,
      total: this.room.price * 1.09
    };
    localStorage.setItem('booking', JSON.stringify(booking));
    this.router.navigate(['/confirmation']);
  }
  get nextDay(): string | null {
    if (!this.searchInfo?.checkInDate) return null;

    const date = new Date(this.searchInfo.checkInDate);
    date.setDate(date.getDate() + 1);

    return date.toISOString().split('T')[0];
  }

  fillRegisteredData() {
    if (this.useRegisteredData) {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.name = user.name || '';
      this.email = user.email || '';
    } else {
      this.name = '';
      this.email = '';
    }
  }
}