import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Environment } from '../Environment/environment';
import { GeneralResponce, IPagedProducts, IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _httpClient = inject(HttpClient);
  private _baseUrl = Environment.baseUrl;

           getAllProducts(
           pageNumber: number,
           pageSize: number,
           sortBy: string,
           sortDesc: boolean,
           searchQuery: string = '',
           categoryId?: string
         ): Observable<{ success: boolean; message: string; data: IPagedProducts }> {
           let params = new HttpParams()
             .set('pageNumber', pageNumber.toString())
             .set('pageSize', pageSize.toString())
             .set('sortBy', sortBy)
             .set('sortDesc', sortDesc.toString());

           if (searchQuery.trim()) {
             params = params.set('search', searchQuery.trim());
           }

           if (categoryId) {
             params = params.set('categoryId', categoryId);
           }

           // Add headers to help with SSL certificate issues in development
           const headers = new HttpHeaders({
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           });

           return this._httpClient.get<{ success: boolean; message: string; data: IPagedProducts }>(
             `${this._baseUrl}/Product/all`,
             { params, headers }
           );
         }

           getProductById(id: string): Observable<GeneralResponce> {
           // Add headers to help with SSL certificate issues in development
           const headers = new HttpHeaders({
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           });

           return this._httpClient.get<GeneralResponce>(`${this._baseUrl}/Product/${id}`, { headers });
         }

           getProductsByCategory(categoryId: string): Observable<{ success: boolean; message: string; data: IProduct[] }> {
           // Add headers to help with SSL certificate issues in development
           const headers = new HttpHeaders({
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           });

           return this._httpClient.get<{ success: boolean; message: string; data: IProduct[] }>(
             `${this._baseUrl}/Product/by-category/${categoryId}`,
             { headers }
           );
         }

  getProductSpecifications(productId: string): Observable<{ success: boolean; message: string; data: any[] }> {
    // Add headers to help with SSL certificate issues in development
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this._httpClient.get<{ success: boolean; message: string; data: any[] }>(
      `${this._baseUrl}/Product/${productId}/specifications`,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error fetching product specifications:', error);
        
        // Handle SSL certificate errors specifically
        if (error && error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
          console.warn('SSL certificate error detected. This is expected in development.');
          console.warn('To resolve this, please:');
          console.warn('1. Visit https://localhost:7230 in your browser and accept the certificate');
          console.warn('2. Or configure your backend to use proper SSL certificates');
        }
        
        return of({
          success: false,
          message: 'Failed to load specifications due to SSL certificate issue',
          data: []
        });
      })
    );
  }


}
