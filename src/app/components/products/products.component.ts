import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { IProduct } from '../../Interfaces/iproduct';


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
  // For demo, generate 50 products matching the Product interface
  this.products = Array.from({ length: 50 }, (_, i) => {
    const price = Math.floor(Math.random() * 1000) + 500;
    const discountPrice = price - Math.floor(Math.random() * 100);

    return {
      id: `${i + 1}`,
      name: `Gaming Laptop Pro X ${i + 1}`,
      price: price,
      discountPrice: discountPrice,
      imageUrl: `https://example.com/laptop-${i + 1}.jpg`,
      categoryName: null, // or 'Electronics' if needed
      subCategoryId: "BD4CE6BB-7CCD-43B6-AA4D-9A7335D56DB8",
      subCategoryName: "Laptops",
      status: "None"
    };
  });

  this.totalPages = Math.ceil(this.products.length / this.pageSize);
  this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

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
