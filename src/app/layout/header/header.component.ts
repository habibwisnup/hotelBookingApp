import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutModule } from '../layout.module';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports : [CommonModule, LayoutModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  sidebarOpen = false;

  constructor(private router: Router, private location: Location) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
    this.sidebarOpen = false;
  }

  logout(): void {
    this.sidebarOpen = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    console.log('User logged out');
  }

  goBack(): void {
    this.location.back();
  }
}
