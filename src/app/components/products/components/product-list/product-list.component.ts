import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../Interfaces/iproduct';
import { ProductService } from '../../../../Services/product.service';
import { CartService } from '../../../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgFor} from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent, NgFor, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: IProduct[] = [];
  pagedProducts: IProduct[] = [];

  searchQuery: string = '';
  sortOrder: string = '';

  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Example assumes service handles pagination, sorting
    this.productService
      .getAllProducts(this.currentPage, this.pageSize, 'name', false)
      .subscribe({
        next: (response) => {
          const pagedData = response.data;
          this.allProducts = pagedData.items;
          this.totalPages = pagedData.totalPages;
          this.applyFilters();
        },
        error: (err) => {
          console.error('❌ Failed to load products', err);
        }
      });
  }

  applyFilters(): void {
    let filtered = [...this.allProducts];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (this.sortOrder === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.pagedProducts = filtered;
  }

  filterProducts(): void {
    this.applyFilters();
  }

  sortProducts(): void {
    this.applyFilters();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  handleAddToCart(productId: string): void {
    this.cartService.addItem({ productId, quantity: 1 }).subscribe({
      next: (res) => {
        console.log('✅ Added to cart:', res);
      },
      error: (err) => {
        console.error('❌ Failed to add to cart:', err);
      }
    });
  }

  trackByIndex(index: number, _: any): number {
    return index;
  }
}
