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
  { id: 'services', name: 'Services', imageUrl: 'assets/Images/Categories/customer-service-1.png' },
  { id: 'cpu', name: 'Processors', imageUrl: 'assets/Images/Categories/processors.png' },
  { id: 'motherboard', name: 'Motherboards', imageUrl: 'assets/Images/Categories/motherboard.png' },
  { id: 'gpu', name: 'Graphics Cards', imageUrl: 'assets/Images/Categories/video-card.png' },
  { id: 'laptop', name: 'Laptops', imageUrl: 'assets/Images/Categories/laptop.png' },
  { id: 'ram', name: 'RAM', imageUrl: 'assets/Images/Categories/ram.png' }
];

  constructor(private router: Router) {}

  navigateToCategory(id: string) {
    this.router.navigate(['/category-details', id]);
  }
}
