import { Component, OnInit, Output } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { NgFor } from '@angular/common';
import { IProduct } from '../../../../Interfaces/iproduct';
import { ProductService } from '../../../../Services/product.service';
import { CartService } from '../../../../Services/cart.service';

  @Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductItemComponent,NgFor],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
  })
  export class ProductListComponent implements OnInit {
    pagedProducts: IProduct[] = [];  
    products: IProduct[] = [];
    currentPage = 1;
    pageSize = 6;
    totalPages = 2;
    sortBy: string = 'name';
    sortDesc: boolean = false;
    
    @Output() addId! : string 

    constructor(private productService: ProductService, private cartService: CartService) {}

    ngOnInit() {
      this.loadProducts();
    }
    
  loadProducts() {
  this.productService.getAllProducts(this.currentPage, this.pageSize, this.sortBy, this.sortDesc)
    .subscribe({
      next: (response) => {
        console.log(response); // Check the full response
        const pagedData = response.data;

        this.pagedProducts = pagedData.items;
        this.totalPages = pagedData.totalPages;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
}


  changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.loadProducts();
}

get totalPagesArray(): number[] {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

handleAddToCart(productId: string) {
  this.cartService.addItem({ productId, quantity: 1 }).subscribe({
  next: (res) => {
    console.log('✅ Added to cart:', res);
  },
  error: (err) => {
    console.error('❌ Failed to add to cart:', err);
  }
});

}

  }
