import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductListComponent } from "./components/product-list/product-list.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];      // all products (50+ items)
  pagedProducts: IProduct[] = []; // products to show on current page
  currentPage: number = 1;
  pageSize: number = 9;           // products per page
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  ngOnInit() {
    // For demo, generate 50 products (replace with real data)
    this.products = Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Product ${i + 1}`,
      description: `Description of product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      category: ['Electronics', 'Books', 'Clothing'][i % 3],
    }));

    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);

    this.updatePagedProducts();
  }

  updatePagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.products.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedProducts();
  }
}
