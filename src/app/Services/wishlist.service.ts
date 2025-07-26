import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Environment } from '../Environment/environment';
import { GeneralResponse } from '../Interfaces/iorder';
import { WishListCreateDTO, WishListReadDTO, WishListItemCreateDTO, WishListItemReadDTO } from '../Interfaces/wishlist';

 

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private _baseUrl = `${Environment.baseUrl}/WishList`;
  private isBrowser: boolean;

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Subjects for wishlist state
  private itemsCountSubject = new BehaviorSubject<number>(0);

  get itemCount$(): Observable<number> {
    return this.itemsCountSubject.asObservable();
  }

  private getCustomerId(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('customerId');
  }

  // ==================== Core API ====================

  createWishList(dto: WishListCreateDTO) {
    return this._http.post<GeneralResponse<string>>(this._baseUrl, dto).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getWishListById(id: string) {
    return this._http.get<GeneralResponse<WishListReadDTO>>(`${this._baseUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getWishListByCustomerId(customerId: string) {
    return this._http.get<GeneralResponse<WishListReadDTO>>(`${this._baseUrl}/customer/${customerId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  addItemToWishList(wishListId: string, dto: WishListItemCreateDTO) {
    return this._http.post<GeneralResponse<string>>(`${this._baseUrl}/${wishListId}/items`, dto).pipe(
      catchError(err => throwError(() => err))
    );
  }

  removeItemFromWishList(wishListId: string, itemId: string) {
    return this._http.delete<GeneralResponse<string>>(`${this._baseUrl}/${wishListId}/items/${itemId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ==================== High-level Helpers ====================

  getLoggedWishList() {
    if (!this.isBrowser) return throwError(() => new Error('Cannot access wishlist on server.'));
    const userId = this.getCustomerId();
    if (!userId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this._http.get<GeneralResponse<WishListReadDTO>>(`${this._baseUrl}/customer/${userId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  removeWishedItem(productId: string) {
    return this.getLoggedWishList().pipe(
      switchMap(res => {
        const wishlist = res.data;
        const item = wishlist?.items?.find(i => i.productId === productId);
        if (!wishlist || !item) {
          return throwError(() => new Error('Item not found in wishlist.'));
        }
        return this.removeItemFromWishList(wishlist.id, item.id);
      }),
      catchError(err => throwError(() => err))
    );
  }

  addItemToCustomerWishlist(customerId: string, productId: string) {
    return this.getWishListByCustomerId(customerId).pipe(
      switchMap(res => {
        const wishlist = res.data;
        const dto: WishListItemCreateDTO = { productId };

        if (wishlist && wishlist.id) {
          return this.addItemToWishList(wishlist.id, dto);
        } else {
          const newWishlist: WishListCreateDTO = {
            customerId,
            items: [dto]
          };
          return this.createWishList(newWishlist);
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  // ==================== State ====================

  private updateWishlistState(items: WishListItemReadDTO[]) {
    this.itemsCountSubject.next(items.length);
  }

  initializeWishlistState(): void {
    if (!this.isBrowser) return;

    const userId = this.getCustomerId();
    if (!userId) return;

    this.getLoggedWishList().subscribe({
      next: (res) => {
        const items = res.data?.items || [];
        this.updateWishlistState(items);
      },
      error: (err) => {
        console.error('Failed to initialize wishlist state:', err);
      }
    });
  }
}