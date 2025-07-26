import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../Interfaces/iproduct';
import { ProductService } from '../../../../Services/product.service';
import { CartService } from '../../../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgFor} from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

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

  _toastr = inject(ToastrService);

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('🚀 Starting to load products...');
    this.productService
      .getAllProducts(this.currentPage, this.pageSize, 'name', false)
      .subscribe({
        next: (response) => {
          console.log('✅ API Response received:', response);
          const pagedData = response.data;
          console.log('📦 Paged data:', pagedData);
          this.allProducts = pagedData.items;
          console.log('📋 All products loaded:', this.allProducts.length, 'items');
          this.totalPages = pagedData.totalPages;
          this.applyFilters();
          // Initialize cart state only if user is logged in
          try {
            this.cartService.initializeCartState();
          } catch (error) {
            console.log('User not logged in, skipping cart initialization');
          }
        },
        error: (err) => {
          console.error('❌ Failed to load products from API:', err);
          this.allProducts = [];
          this.totalPages = 0;
          this.applyFilters();
        }
      });
  }

  applyFilters(): void {
    console.log('🔍 Applying filters...');
    console.log('📋 All products before filtering:', this.allProducts.length);
    let filtered = [...this.allProducts];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
      );
      console.log('🔍 After search filter:', filtered.length, 'items');
    }

    // Apply sorting
    if (this.sortOrder === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Update total pages based on filtered results
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    
    // Reset to first page if current page is out of bounds
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = filtered.slice(startIndex, endIndex);
    
    console.log('📦 Final paged products:', this.pagedProducts.length, 'items');
    console.log('📄 Current page:', this.currentPage, 'of', this.totalPages);
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
    this.applyFilters(); // Re-apply filters with new page
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  handleAddToCart(productId: string): void {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      this._toastr.error('Please login first');
      return;
    }
    
    console.log('🛒 Attempting to add to cart:', { productId, customerId });
    
    this.cartService.addItem({ productId, quantity: 1 }).subscribe({
      next: (res) => {
        console.log('✅ Cart API response:', res);
        this._toastr.success('Added to cart');
        this.cartService.initializeCartState();
      },
      error: (err) => {
        console.error('❌ Cart API error details:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          url: err.url,
          error: err.error
        });
        this._toastr.error('Could not add to cart - Check if API is running');
      }
    });
  }

  trackByIndex(index: number, _: any): number {
    return index;
  }
}
