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
<<<<<<< HEAD
=======
  productId!: string;
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
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
<<<<<<< HEAD
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.productService.getProductById(id).subscribe({
=======
    this.productId = this.route.snapshot.paramMap.get('id')!;
    if (!this.productId) return;

    this.productService.getProductById(this.productId).subscribe({
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        console.error('❌ Error fetching product:', err);
<<<<<<< HEAD
    
=======
        
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
      }
    });
  }

  onAddToCart(): void {
    if (!this.product) return;

    this.isAddingToCart = true;

<<<<<<< HEAD
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
=======
    const priceToUse =
      this.product.discountPrice && this.product.discountPrice < this.product.price
        ? this.product.discountPrice
        : this.product.price;

    this.cartService
      .addItem({
        productId: this.product.id,
        quantity: 1,
        product: {
          id: this.product.id,
          name: this.product.name,
          price: priceToUse,
          imageUrl: this.product.imageUrl,
          discountPrice: this.product.discountPrice
        }
      })
      .subscribe({
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
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
  }

  onAddToWishlist(product: IProduct): void {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      this.toastr.error('Please log in first');
      return;
    }

    this.wishlistService.addItemToCustomerWishlist(customerId, product.id).subscribe({
      next: () => {
<<<<<<< HEAD
        this.toastr.success(`${this.product.name} added to whishlist!`);
=======
        this.toastr.success(`${product.name} added to wishlist!`);
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
        this.wishlistService.initializeWishlistState();
      },
      error: (err) => {
        console.error('❌ Wishlist error:', err);
        this.toastr.error('Failed to add to wishlist.');
      }
    });
  }
}
