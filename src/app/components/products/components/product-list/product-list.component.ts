import { Component } from '@angular/core';
import { IProduct } from '../../../../Interfaces/iproduct';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: IProduct[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  pagedProducts: IProduct[] = [];

  ngOnInit() {
    this.products = this.generateProducts(50);
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    this.updatePagedProducts();
  }

  generateProducts(count: number): IProduct[] {
    const products: IProduct[] = [];
    for (let i = 1; i <= count; i++) {
      products.push({
        id: i.toString(),
        name: `Product ${i}`,
        description: `Short description for Product ${i}.`,
        price: +(Math.random() * 100 + 10).toFixed(2),
        title: `Title of Product ${i}`,
        link: `https://example.com/products/${i}`,
        category: i % 2 === 0 ? 'Category A' : 'Category B'
      });
    }
    return products;
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
