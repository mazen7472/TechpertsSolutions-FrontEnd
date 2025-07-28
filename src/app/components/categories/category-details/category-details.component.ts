import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../Interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {
  categoryName = '';
  products: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.categoryName = this.mapCategory(id);
    this.loadProductsByCategory(id);
  }

  mapCategory(id: string): string {
    const map: { [key: string]: string } = {
      cpu: 'Processors',
      gpu: 'Graphics Cards',
      motherboard: 'Motherboards',
    };
    return map[id] || 'Unknown';
  }

  loadProductsByCategory(categoryId: string): void {
    this.loading = true;
    this.error = '';

    // Load products for the specific category
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        console.log(response);
        
        if (response.success) {
          this.products = response.data.products;
          console.log(this.products);
        } else {
          this.error = response.message || 'Failed to load products';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading category products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  selectProduct(product: IProduct) {
    const enriched = {
      ...product,
      title: product.name,
      link: 'https://example.com/products/' + product.id,
      category: this.categoryName
    };
    this.router.navigate(['/selector'], { state: { selectedProduct: enriched } });
  }
}
