import { CartItem, CartService } from './../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../Interfaces/ICartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    CartItems:CartItem[] = []

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
  this.CartService.getCart().subscribe({
    next: (res: any) => {
      const rawItems = res?.data?.cartItems || [];

      this.CartItems = rawItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.productId,
          name: item.productName,
          price: item.price,
          imageUrl: item.imageUrl,
          discountPrice: item.discountPrice
        }
      }));

      // ✅ Push updated state to CartService
      this.CartService.updateCartState(this.CartItems);
    },
    error: (err: any) => {
      console.log(err);
    },
  });
}
  


  addToCart(productId: string, quantity: number): void {
    const item: ICartItem = { productId, quantity };
    this.CartService.addItem(item).subscribe(() => this.loadCart());
  }

  updateItem(item: ICartItem): void {
    this.CartService.updateItem(item).subscribe(() => this.loadCart());
  }

  removeItem(productId: string): void {
    this.CartService.removeItem(productId).subscribe(() => this.loadCart());
    console.log(productId);
    
  }

  clearCart(): void {
    this.CartService.clearCart().subscribe(() => this.loadCart());
  }

  checkout(): void {
    this.CartService.checkout().subscribe(() => {
      alert('Checkout complete!');
      this.loadCart();
    });
  }

  getTotal(): number {
  return this.CartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );
}

  hasDiscount(item: ICartItem): boolean {
  return (
    item.product?.discountPrice !== undefined &&
    item.product?.price !== undefined &&
    item.product.discountPrice < item.product.price
  );
}
}
