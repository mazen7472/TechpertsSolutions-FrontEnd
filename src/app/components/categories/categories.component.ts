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
    { id: 'cpu', name: 'Processors' },
    { id: 'gpu', name: 'Graphics Cards' },
    { id: 'motherboard', name: 'Motherboards' },
    // Add more categories here
  ];

  constructor(private router: Router) {}

  navigateToCategory(id: string) {
    this.router.navigate(['/category-details', id]);
  }
}
