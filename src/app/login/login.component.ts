import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user && user !== '{}') {
      this.router.navigate(['/dashboard']);
    }
  }

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password is required!';
      this.showError = true;
      setTimeout(() => this.showError = false, 1500);
      return;
    }
    this.loading = true;
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const regRole = JSON.parse(localStorage.getItem('registeredUserRole') || '{}');
      type UserData = { email: string; role: string; name?: string; address?: string };
      let userData: UserData = { email: this.email, role: 'user' };
      if (regRole && regRole.email === this.email) {
        userData = {
          email: regRole.email,
          name: regRole.name || '',
          address: regRole.address || '',
          role: regRole.role || 'user'
        };
      }
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        if (userData.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      }, 1200);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Login failed';
      this.showError = true;
      setTimeout(() => this.showError = false, 1500);
    } finally {
      this.loading = false;
    }
  }

  OnRegister() {
    this.router.navigate(['/register']);
  }
}