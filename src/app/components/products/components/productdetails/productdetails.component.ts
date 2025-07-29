import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ProductService } from '../../../../Services/product.service';
import { CartService } from '../../../../Services/cart.service';
import { WishlistService } from '../../../../Services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../../../Interfaces/iproduct';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
  product!: IProduct;
  isAddingToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        console.error('❌ Error fetching product:', err);
    
      }
    });
  }

  onAddToCart(): void {
    if (!this.product) return;

    this.isAddingToCart = true;

    const price = this.product.discountPrice && this.product.discountPrice < this.product.price
      ? this.product.discountPrice
      : this.product.price;

    this.cartService.addItem({
      productId: this.product.id,
      quantity: 1,
      product: {
        id: this.product.id,
        name: this.product.name,
        price,
        imageUrl: this.product.imageUrl,
        discountPrice: this.product.discountPrice
      }
    }).subscribe({
      next: () => {
        this.cartService.initializeCartState();
        this.toastr.success(`${this.product.name} added to cart!`);
        this.isAddingToCart = false;
      },
      error: (err) => {
        console.error('❌ Failed to add to cart:', err);
        this.toastr.error('Something went wrong. Please try again.');
        this.isAddingToCart = false;
      }
    });
  }

  onAddToWishlist(product: IProduct): void {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      this.toastr.error('Please log in first');
      return;
    }

    this.wishlistService.addItemToCustomerWishlist(customerId, product.id).subscribe({
      next: () => {
        this.toastr.success(`${this.product.name} added to whishlist!`);
        this.wishlistService.initializeWishlistState();
      },
      error: (err) => {
        console.error('❌ Wishlist error:', err);
        this.toastr.error('Failed to add to wishlist.');
      }
    });
  }
}
