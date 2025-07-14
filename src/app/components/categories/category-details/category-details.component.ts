import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../Interfaces/iproduct';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {
  categoryName = '';
  products: IProduct[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.categoryName = this.mapCategory(id);
    this.products = this.loadProducts(id);
  }

  mapCategory(id: string): string {
    const map: { [key: string]: string } = {
      cpu: 'Processors',
      gpu: 'Graphics Cards',
      motherboard: 'Motherboards',
    };
    return map[id] || 'Unknown';
  }

  loadProducts(id: string): IProduct[] {
    return [
      { id: 'p1', name: 'Intel i7', description: 'High-performance CPU', price: 299 },
      { id: 'p2', name: 'AMD Ryzen 9', description: 'Multithreaded beast', price: 349 },
    ];
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
