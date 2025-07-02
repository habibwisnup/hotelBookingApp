import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../layout/header/header.component";
import { LayoutModule } from '../layout/layout.module';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LayoutModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  booking = JSON.parse(localStorage.getItem('booking') || '{}');
  searchInfo = JSON.parse(localStorage.getItem('search') || '{}');
  confirmationNumber = 'RES' + Math.floor(Math.random() * 1000000000);
  sidebarOpen = false;

  constructor(private router: Router) {
    if (this.booking && this.booking.checkInDate) {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const exists = bookings.some((b: any) =>
        b.checkInDate === this.booking.checkInDate &&
        b.room?.name === this.booking.room?.name
      );
      if (!exists) {
        bookings.push(this.booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
      }
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  get nextDay(): string | null {
    if (!this.searchInfo?.checkInDate) return null;

    const date = new Date(this.searchInfo.checkInDate);
    date.setDate(date.getDate() + 1);

    return date.toISOString().split('T')[0];
  }
}