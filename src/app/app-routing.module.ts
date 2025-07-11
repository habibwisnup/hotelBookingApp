import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'admin-dashboard', canActivate: [authGuard], loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'admin-hotel-dashboard', canActivate: [authGuard], loadComponent: () => import('./admin-hotel-dashboard/admin-hotel-dashboard.component').then(m => m.AdminHotelDashboardComponent) },
  { path: 'admin-dashboard-room', canActivate: [authGuard], loadComponent: () => import('./admin-dashboard-room/admin-dashboard-room.component').then(m => m.AdminDashboardRoomComponent) },
  { path: 'contact', canActivate: [authGuard], loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
  { path: 'confirmation', canActivate: [authGuard], loadComponent: () => import('./confirmation/confirmation.component').then(m => m.ConfirmationComponent) },
  { path: 'rooms', loadComponent: () => import('./rooms/rooms.component').then(m => m.RoomsComponent) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
