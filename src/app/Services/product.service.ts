import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  searchQuery: string = ''
): Observable<{ success: boolean; message: string; data: IPagedProducts }> {
  let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString())
    .set('sortBy', sortBy)
    .set('sortDesc', sortDesc.toString());

  if (searchQuery.trim()) {
    params = params.set('search', searchQuery.trim());
  }

  return this._httpClient.get<{ success: boolean; message: string; data: IPagedProducts }>(
    `${this._baseUrl}/Product/all`,
    { params }
  );

}
getProductById(id: string): Observable<GeneralResponce>{
  return this._httpClient.get<GeneralResponce>(`${this._baseUrl}/Product/${id}`)
}

}
