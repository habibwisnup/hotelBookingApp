import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';

@Component({
  selector: 'app-booking-steps',
  standalone: true,
  imports: [CommonModule, LayoutModule],
  templateUrl: './booking-steps.component.html',
  styleUrls: ['./booking-steps.component.css']
})
export class BookingStepsComponent {
  @Input() activeStep: number = 1;
  @Input() steps: string[] = [
    'Search',
    'Select Room',
    'Contact Information',
    'Confirmation'
  ];

  stepRoutes: string[] = [
    'home',        
    'rooms',         
    'contact',     
    'confirmation' 
  ];

  constructor(private router: Router) {}

  navigateToStep(index: number) {
    if (this.activeStep === this.steps.length) {
      return;
    }
    if (index < this.activeStep) {
      const path = this.stepRoutes[index];
      this.router.navigate([`/${path}`]);
    }
  }
}
