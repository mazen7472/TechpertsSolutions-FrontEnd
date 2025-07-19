import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [
    { id: 'cpu', name: 'Processors', imageUrl: 'assets/Images/motherboard.png' },
    { id: 'gpu', name: 'Graphics Cards', imageUrl: 'assets/Images/video-card-1.png' },
    { id: 'motherboard', name: 'Motherboards', imageUrl: 'assets/Images/motherboard.png' },
    // Add more categories with imageUrl
  ];

  constructor(private router: Router) {}

  navigateToCategory(id: string) {
    this.router.navigate(['/category-details', id]);
  }
}
