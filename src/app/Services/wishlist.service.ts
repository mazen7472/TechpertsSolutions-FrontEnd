import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { GeneralResponse, WishListCreateDTO, WishListItemCreateDTO, WishListReadDTO } from '../Interfaces/wishlist';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private _http = inject(HttpClient);
  private _baseUrl = `${Environment.baseUrl}/WishList`;

  

  createWishList(dto: WishListCreateDTO): Observable<GeneralResponse<string>> {
    return this._http.post<GeneralResponse<string>>(this._baseUrl, dto).pipe(
      catchError(error => {
        console.error('Failed to create wishlist', error);
        return throwError(() => error);
      })
    );
  }

  getWishListById(id: string): Observable<GeneralResponse<WishListReadDTO>> {
    return this._http.get<GeneralResponse<WishListReadDTO>>(`${this._baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Failed to fetch wishlist by ID', error);
        return throwError(() => error);
      })
    );
  }

  getWishListByCustomerId(customerId: string): Observable<GeneralResponse<WishListReadDTO>> {
    return this._http.get<GeneralResponse<WishListReadDTO>>(`${this._baseUrl}/customer/${customerId}`).pipe(
      catchError(error => {
        console.error('Failed to fetch wishlist by customer ID', error);
        return throwError(() => error);
      })
    );
  }

  addItemToWishList(wishListId: string, dto: WishListItemCreateDTO): Observable<GeneralResponse<string>> {
    return this._http.post<GeneralResponse<string>>(`${this._baseUrl}/${wishListId}/items`, dto).pipe(
      catchError(error => {
        console.error('Failed to add item to wishlist', error);
        return throwError(() => error);
      })
    );
  }

  removeItemFromWishList(wishListId: string, itemId: string): Observable<GeneralResponse<string>> {
    return this._http.delete<GeneralResponse<string>>(`${this._baseUrl}/${wishListId}/items/${itemId}`).pipe(
      catchError(error => {
        console.error('Failed to remove item from wishlist', error);
        return throwError(() => error);
      })
    );
  }

  addItemToCustomerWishlist(customerId: string, productId: string): Observable<GeneralResponse<string>> {
  return this.getWishListByCustomerId(customerId).pipe(
    switchMap((response) => {
      const wishlist = response.data;

      if (wishlist && wishlist.id) {
        // Wishlist exists, just add item
        const dto: WishListItemCreateDTO = { productId };
        return this.addItemToWishList(wishlist.id, dto);
      } else {
        // Wishlist does not exist, create first
        const newWishlist: WishListCreateDTO = {
          customerId,
          items: [{ productId }]
        };
        return this.createWishList(newWishlist);
      }
    }),
    catchError(error => {
      console.error('Error in addItemToCustomerWishlist:', error);
      return throwError(() => error);
    })
  );
}
}
