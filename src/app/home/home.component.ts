import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutModule } from "../layout/layout.module";
import { HeaderComponent } from "../layout/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  guestCount = 1;
  checkInDate = '';
  checkoutDate = '';
  showDateError = false;
  sidebarOpen = false;

  constructor(private router: Router) {}

  searchRooms() {
    if (!this.checkInDate || !this.checkoutDate) {
      this.showDateError = true;
      setTimeout(() => this.showDateError = false, 2000);
      return;
    }
    localStorage.setItem('search', JSON.stringify({
      guestCount: this.guestCount,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate
    }));
    this.router.navigate(['/rooms']);
  }
  OnHome() {
    this.router.navigate(['/home']);
  }

  OnDashboard() {
    this.router.navigate(['/dashboard']);
  }

  OnProfile() {
    this.router.navigate(['/profile']);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  hideSidebar() {
    this.sidebarOpen = false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}