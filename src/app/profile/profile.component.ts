import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../layout/header/header.component";
import { LayoutModule } from '../layout/layout.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, LayoutModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  sidebarOpen = false;
  showSuccess = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.user || !this.user.email) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.user.name) {
      const regRole = JSON.parse(localStorage.getItem('registeredUserRole') || '{}');
      if (regRole && regRole.email === this.user.email && regRole.name) {
        this.user.name = regRole.name;
      }
    }
    if (!this.user.address) {
      this.user.address = '';
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  updateProfile() {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    const regRole = JSON.parse(localStorage.getItem('registeredUserRole') || '{}');
    if (regRole && regRole.email === this.user.email) {
      regRole.name = this.user.name;
      regRole.address = this.user.address;
      localStorage.setItem('registeredUserRole', JSON.stringify(regRole));
    }
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 1200);
  }
}
