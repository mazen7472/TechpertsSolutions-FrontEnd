import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Environment } from '../Environment/environment';
import { ICartItem } from '../Interfaces/ICartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _baseUrl = Environment.baseUrl;
  private readonly isBrowser: boolean;

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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getCustomerId(): string | null {
    return this.isBrowser ? localStorage.getItem('customerId') : null;
  }

  getCart(): Observable<ICartItem[]> {
    if (!this.isBrowser) return of([]);

    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.get<ICartItem[]>(`${this._baseUrl}/Cart/${userId}`).pipe(
      tap(cartItems => this.updateCartSummary(cartItems))
    );
  }

  addItem(item: ICartItem): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot add item on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.post(`${this._baseUrl}/Cart/${userId}/items`, item).pipe(
      tap(() => {
        this.triggerCartAnimation();
        this.getCart().subscribe(); // Refresh cart summary
      })
    );
  }

  updateItem(item: ICartItem): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot update item on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.put(`${this._baseUrl}/Cart/${userId}/items`, item).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  removeItem(productId: string): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot remove item on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.delete(`${this._baseUrl}/Cart/${userId}/items/${productId}`).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  clearCart(): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot clear cart on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.delete(`${this._baseUrl}/Cart/${userId}/clear`).pipe(
      tap(() => this.updateCartSummary([]))
    );
  }

  checkout(): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot checkout on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.post(`${this._baseUrl}/Cart/${userId}/checkout`, {}).pipe(
      tap(() => this.updateCartSummary([]))
    );
  }

  private updateCartSummary(cartItems: ICartItem[]): void {
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = cartItems.reduce((acc, item) => {
      const price = item.product?.discountPrice ?? item.product?.price ?? 0;
      return acc + price * item.quantity;
    }, 0);

    this.itemsCountSubject.next(itemCount);
    this.totalPriceSubject.next(total);
  }

  private triggerCartAnimation(): void {
    this.animateCartSubject.next(true);
    setTimeout(() => this.animateCartSubject.next(false), 400);
  }
}
