import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { IProduct } from '../../../../Interfaces/iproduct';
import { CartService } from '../../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WishlistService } from '../../../../Services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  @Input() productC!: IProduct;
  @Output() addToCart = new EventEmitter<string>();

  _router = inject(Router);
  _cartService = inject(CartService);
  _wishlistService = inject(WishlistService);
  _toastr = inject(ToastrService);

  onAddToCart() {
    this.addToCart.emit(this.productC.id);
  }

  goToProduct(id: string) {
    this._router.navigate(['/product-details', id]);
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://picsum.photos/seed/' + this.productC.id + '/300/200';
  }

  ngOnInit(): void {
    console.log('Product item initialized with:', this.productC);
  }

  // ADD WISHLIST LOGIC HERE
onAddToWishlist(product: IProduct) {
  const customerId = localStorage.getItem('customerId');
  if (!customerId) {
    this._toastr.error('Please login first');
    return;
  }

  this._wishlistService.addItemToCustomerWishlist(customerId, product.id).subscribe({
    next: () => {
      this._toastr.success('Added to wishlist');
      this._wishlistService.initializeWishlistState();
    },
    error: (err) => {
      console.error('Error adding to wishlist:', err);
      this._toastr.error('Could not add to wishlist');
    }
  });
}
}
