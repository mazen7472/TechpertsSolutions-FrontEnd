import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../Environment/environment';
import { IPagedProducts } from '../Interfaces/iproduct';
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
  sortDesc: boolean
): Observable<{ success: boolean; message: string; data: IPagedProducts }> {
  let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString())
    .set('sortBy', sortBy)
    .set('sortDesc', sortDesc.toString());

  return this._httpClient.get<{ success: boolean; message: string; data: IPagedProducts }>(
    `${this._baseUrl}/Product/all`,
    { params }
  );
}

}
