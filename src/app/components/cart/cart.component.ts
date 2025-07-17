import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ICartItem } from '../../Interfaces/ICartItem';
import { CurrencyPipe, NgIf, NgFor, CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
   standalone: true,
  imports: [
    CommonModule, 
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;
  loading: boolean = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
    
    // Subscribe to total price updates (optional)
    this.cartService.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.loading = false;
      }
    });
  }

  updateQuantity(item: ICartItem, quantity: number): void {
    if (quantity < 1) return;

    const updatedItem = { ...item, quantity };
    this.cartService.updateItem(updatedItem).subscribe();
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId).subscribe();
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
    });
  }

  checkout(): void {
    this.cartService.checkout().subscribe({
      next: () => {
        this.cartItems = [];
        alert('Checkout successful!');
      },
      error: (err) => {
        console.error('Checkout failed:', err);
      }
    });
  }

  getItemTotal(item: ICartItem): number {
    const price = item.product?.discountPrice ?? item.product?.price ?? 0;
    return price * item.quantity;
  }
}