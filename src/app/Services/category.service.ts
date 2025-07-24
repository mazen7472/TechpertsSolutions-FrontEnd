import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory, ICategoryCreate, ICategoryUpdate, IGeneralResponse } from '../Interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${Environment.baseUrl}/Category`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<IGeneralResponse<ICategory[]>> {
    return this.http.get<IGeneralResponse<ICategory[]>>(`${this.apiUrl}/All`);
  }

  getCategoryById(id: string): Observable<IGeneralResponse<ICategory>> {
    return this.http.get<IGeneralResponse<ICategory>>(`${this.apiUrl}/GetCategory/${id}`);
  }

  createCategory(category: ICategoryCreate): Observable<IGeneralResponse<ICategory>> {
    return this.http.post<IGeneralResponse<ICategory>>(`${this.apiUrl}/Create`, category);
  }

  updateCategory(id: string, category: ICategoryUpdate): Observable<IGeneralResponse<any>> {
    return this.http.put<IGeneralResponse<any>>(`${this.apiUrl}/Update/${id}`, category);
  }

  deleteCategory(id: string): Observable<IGeneralResponse<any>> {
    return this.http.delete<IGeneralResponse<any>>(`${this.apiUrl}/Delete/${id}`);
  }
}
