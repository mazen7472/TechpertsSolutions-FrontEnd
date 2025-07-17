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
    {
      id: 'p1',
      name: 'Intel i7',
      price: 299,
      discountPrice: 279, // example discounted price
      imageUrl: 'https://example.com/images/intel-i7.jpg',
      categoryName: 'Processors',
      subCategoryId: 'subcat-001',
      subCategoryName: 'CPU',
      status: 'Available'
    },
    {
      id: 'p2',
      name: 'AMD Ryzen 9',
      price: 349,
      discountPrice: 329, // example discounted price
      imageUrl: 'https://example.com/images/amd-ryzen9.jpg',
      categoryName: 'Processors',
      subCategoryId: 'subcat-001',
      subCategoryName: 'CPU',
      status: 'OutOfStock'
    }
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
