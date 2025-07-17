import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Environment } from './../Environment/environment';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  discountPrice?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _baseUrl = Environment.baseUrl;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getCustomerId(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('customerId');
  }

  getCart(): Observable<CartItem[]> {
    if (!this.isBrowser) return of([]);
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));
    return this.http.get<CartItem[]>(`${this._baseUrl}/Cart/${userId}`);
  }

  addItem(item: CartItem): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot add item on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    const formData = new FormData();
    formData.append('ProductId', item.productId);
    formData.append('Quantity', item.quantity.toString());

    return this.http.post(`${this._baseUrl}/Cart/${userId}/items`, formData);
  }

  updateItem(item: CartItem): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot update item on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    const formData = new FormData();
    formData.append('ProductId', item.productId);
    formData.append('Quantity', item.quantity.toString());

    return this.http.put(`${this._baseUrl}/Cart/${userId}/items`, formData);
  }

  removeItem(productId: string): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot remove item on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));
    return this.http.delete(`${this._baseUrl}/Cart/${userId}/items/${productId}`);
  }

  clearCart(): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot clear cart on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));
    return this.http.delete(`${this._baseUrl}/Cart/${userId}/clear`);
  }

  checkout(): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot checkout on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));
    return this.http.post(`${this._baseUrl}/Cart/${userId}/checkout`, {});
  }

  calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
      0
    );
  }

  private itemsCountSubject = new BehaviorSubject<number>(0);
  private totalPriceSubject = new BehaviorSubject<number>(0);
  private animateCartSubject = new BehaviorSubject<boolean>(false);

  get itemCount$(): Observable<number> {
    return this.itemsCountSubject.asObservable();
  }

  get totalPrice$(): Observable<number> {
    return this.totalPriceSubject.asObservable();
  }

  get animateCart$(): Observable<boolean> {
    return this.animateCartSubject.asObservable();
  }

  // Optional: update cart state
  updateCartState(cartItems: CartItem[]) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.calculateTotal(cartItems);

    this.itemsCountSubject.next(totalItems);
    this.totalPriceSubject.next(totalPrice);
    this.animateCartSubject.next(true);

    setTimeout(() => this.animateCartSubject.next(false), 500);
  }
}
