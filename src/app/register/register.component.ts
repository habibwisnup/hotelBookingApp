import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';
  address = '';
  isAdmin = false;
  loading = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  async register() {
    if (!this.email || !this.password) {
      alert('Email and password is required!');
      return;
    }
    this.loading = true;
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      localStorage.setItem(
        'registeredUserRole',
        JSON.stringify({
          email: this.email,
          name: this.name,
          address: this.address,
          role: this.isAdmin ? 'admin' : 'user'
        })
      );
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigate(['/login']);
      }, 1200);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Registration failed';
      this.showError = true;
      setTimeout(() => this.showError = false, 1500);
    } finally {
      this.loading = false;
    }
  }

  OnLogin() {
    this.router.navigate(['/login']);
  }
}