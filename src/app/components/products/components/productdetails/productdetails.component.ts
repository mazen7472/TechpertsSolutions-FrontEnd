import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ProductService } from '../../../../Services/product.service';
import { CartService } from '../../../../Services/cart.service';
import { IProduct } from '../../../../Interfaces/iproduct';
import { WishlistService } from '../../../../Services/wishlist.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
  productId!: string;
  product!: IProduct;
  isAddingToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  onAddToCart(): void {
    if (!this.product) return;

    this.isAddingToCart = true;

    this.cartService.addItem({
      productId: this.product.id,
      quantity: 1,
      product: {
        id: this.product.id,
        name: this.product.name,
        price: this.product.discountPrice || this.product.price,
        imageUrl: this.product.imageUrl,
        discountPrice: this.product.discountPrice
      }
    }).subscribe({
      next: () => {
        this.isAddingToCart = false;
        this.cartService.initializeCartState(); // refresh cart state
        // alert(`${this.product.name} added to cart!`);
      },
      error: (err) => {
        this.isAddingToCart = false;
        console.error('Failed to add to cart:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  onAddToWishlist(): void {
  const customerId = localStorage.getItem('customerId');
  if (!customerId || !this.product) {
    alert('Please log in first.');
    return;
  }

  this.wishlistService.addItemToCustomerWishlist(customerId, this.product.id).subscribe({
    next: (res) => {
      console.log(res);
      
      alert(`${this.product.name} added to your wishlist.`);
    },
    error: (err) => {
      console.error('Failed to add to wishlist:', err);
      alert('Something went wrong. Try again later.');
    }
  });
}

}
