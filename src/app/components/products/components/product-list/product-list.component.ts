import { Component, OnInit } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { NgFor } from '@angular/common';
import { IProduct } from '../../../../Interfaces/iproduct';
import { ProductService } from '../../../../Services/product.service';

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
    pageSize = 10;
    totalPages = 0;
    sortBy: string = 'name';
    sortDesc: boolean = false;
    
    constructor(private productService: ProductService) {}

    ngOnInit() {
      this.loadProducts();
    }
    
  loadProducts() {
  this.productService.getAllProducts(this.currentPage, this.pageSize, this.sortBy, this.sortDesc)
    .subscribe({
      next: (response) => {
        console.log(response); // Check the full response
        const pagedData = response.data;

        this.products = pagedData.items;
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


  }
