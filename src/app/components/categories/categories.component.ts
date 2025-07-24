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
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(response => {
      if (response.success && response.data) {
        this.categories = response.data;
      }
    });
  }

  navigateToCategory(id: string) {
    this.router.navigate(['/category-details', id]);
  }

  trackById(index: number, item: ICategory) {
    return item.id;
  }
}
