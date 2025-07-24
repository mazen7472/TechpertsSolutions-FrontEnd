import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-pc-compare',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pc-compare.component.html',
  styleUrls: ['./pc-compare.component.css']
})
export class PcCompareComponent implements OnInit {
  allProducts: IProduct[] = [];

  categories: string[] = [];

  selectedCategory1: string | null = null;
  selectedCategory2: string | null = null;

  filteredProducts1: IProduct[] = [];
  filteredProducts2: IProduct[] = [];

  selectedProduct1: IProduct | null = null;
  selectedProduct2: IProduct | null = null;

  comparisonResults: {
    key: string;
    value1: string;
    value2: string;
    better: string | null;
  }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts(1, 100, 'name', false).subscribe(res => {
      if (res.success) {
        this.allProducts = res.data.items;
        this.categories = Array.from(
          new Set(this.allProducts.map(p => p.categoryName).filter(c => !!c))
        ) as string[];
      }
    });
  }

  onCategoryChange(column: 1 | 2): void {
    const selectedCategory = column === 1 ? this.selectedCategory1 : this.selectedCategory2;
    const filtered = this.allProducts.filter(p => p.categoryName === selectedCategory);

    if (column === 1) {
      this.filteredProducts1 = filtered;
      this.selectedProduct1 = null;
    } else {
      this.filteredProducts2 = filtered;
      this.selectedProduct2 = null;
    }

    this.comparisonResults = [];
  }

  onProductSelect(column: 1 | 2, event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const productId = selectElement.value;

  if (!productId) {
    if (column === 1) this.selectedProduct1 = null;
    else this.selectedProduct2 = null;
    this.comparisonResults = [];
    return;
  }

 this.productService.getProductById(productId).subscribe(res => {
  if (res.success) {
    console.log('FULL PRODUCT DATA:', res.data); // 🔍 Look for specifications here

    if (column === 1) {
      this.selectedProduct1 = res.data;
    } else {
      this.selectedProduct2 = res.data;
    }

    if (this.selectedProduct1 && this.selectedProduct2) {
      this.compareSpecs();
    }
  }
});

}


  compareSpecs(): void {
    if (!this.selectedProduct1 || !this.selectedProduct2) {
      this.comparisonResults = [];
      return;
    }

    const specs1 = this.selectedProduct1.specifications || [];
    const specs2 = this.selectedProduct2.specifications || [];

    this.comparisonResults = specs1.map(spec1 => {
      const matchingSpec = specs2.find(s => s.key === spec1.key);
      let better: string | null = null;

      if (matchingSpec) {
        const val1 = parseFloat(spec1.value);
        const val2 = parseFloat(matchingSpec.value);

        if (!isNaN(val1) && !isNaN(val2)) {
          better =
            val1 > val2
              ? this.selectedProduct1!.name
              : val1 < val2
              ? this.selectedProduct2!.name
              : null;
        }
      }

      return {
        key: spec1.key,
        value1: spec1.value.toString(),
        value2: matchingSpec ? matchingSpec.value.toString() : 'N/A',
        better
      };
    });
  }

  resetComparison(): void {
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
    this.filteredProducts1 = [];
    this.filteredProducts2 = [];
    this.selectedProduct1 = null;
    this.selectedProduct2 = null;
    this.comparisonResults = [];
  }
}
