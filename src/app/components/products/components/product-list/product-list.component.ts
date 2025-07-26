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
    console.log('🚀 Starting to load products...');
    
    // Temporary mock data for testing
    const mockProducts: IProduct[] = [
      {
        id: '1',
        name: 'Gaming Laptop Pro X1',
        price: 1299,
        discountPrice: 1199,
        imageUrl: 'https://picsum.photos/seed/1/300/200',
        categoryName: 'Electronics',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Laptops',
        status: 'Approved',
        description: 'High-performance gaming laptop with RTX graphics'
      },
      {
        id: '2',
        name: 'Ultra Gaming Desktop',
        price: 2499,
        discountPrice: 2299,
        imageUrl: 'https://picsum.photos/seed/2/300/200',
        categoryName: 'Electronics',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Desktops',
        status: 'Approved',
        description: 'Custom-built gaming desktop with premium components'
      },
      {
        id: '3',
        name: 'Wireless Gaming Mouse',
        price: 89,
        discountPrice: 79,
        imageUrl: 'https://picsum.photos/seed/3/300/200',
        categoryName: 'Accessories',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Mice',
        status: 'Approved',
        description: 'High-precision wireless gaming mouse'
      },
      {
        id: '4',
        name: 'Mechanical Gaming Keyboard',
        price: 149,
        discountPrice: 129,
        imageUrl: 'https://picsum.photos/seed/4/300/200',
        categoryName: 'Accessories',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Keyboards',
        status: 'Approved',
        description: 'RGB mechanical keyboard with customizable switches'
      },
      {
        id: '5',
        name: 'Gaming Headset Pro',
        price: 199,
        discountPrice: 179,
        imageUrl: 'https://picsum.photos/seed/5/300/200',
        categoryName: 'Accessories',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Audio',
        status: 'Approved',
        description: '7.1 surround sound gaming headset with noise cancellation'
      },
      {
        id: '6',
        name: 'Gaming Monitor 27"',
        price: 399,
        discountPrice: 349,
        imageUrl: 'https://picsum.photos/seed/6/300/200',
        categoryName: 'Electronics',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Monitors',
        status: 'Approved',
        description: '144Hz 4K gaming monitor with HDR support'
      },
      {
        id: '7',
        name: 'Gaming Chair Elite',
        price: 299,
        discountPrice: 249,
        imageUrl: 'https://picsum.photos/seed/7/300/200',
        categoryName: 'Accessories',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Furniture',
        status: 'Approved',
        description: 'Ergonomic gaming chair with lumbar support'
      },
      {
        id: '8',
        name: 'Gaming Mouse Pad XL',
        price: 29,
        discountPrice: 24,
        imageUrl: 'https://picsum.photos/seed/8/300/200',
        categoryName: 'Accessories',
        subCategoryId: 'BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8',
        subCategoryName: 'Mouse Pads',
        status: 'Approved',
        description: 'Extra large gaming mouse pad with RGB lighting'
      }
    ];

    // Use mock data for now
    this.allProducts = mockProducts;
    this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
    console.log('📋 Mock products loaded:', this.allProducts.length, 'items');
    this.applyFilters();
    
    // Initialize cart state only if user is logged in
    try {
      this.cartService.initializeCartState();
    } catch (error) {
      console.log('User not logged in, skipping cart initialization');
    }

    // Comment out the actual API call for now
    /*
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
          this.cartService.initializeCartState();
        },
        error: (err) => {
          console.error('❌ Failed to load products', err);
        }
      });
    */
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
    this.cartService.addItem({ productId, quantity: 1 }).subscribe({
      next: (res) => {
        console.log('✅ Added to cart:', res);
        this.cartService.initializeCartState();
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
