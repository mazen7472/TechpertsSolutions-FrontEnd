import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
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

  trackById(index: number, item: ICategory) {
    return item.id;
  }
}
