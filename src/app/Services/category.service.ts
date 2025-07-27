import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ICategory, ICategoryCreate, ICategoryUpdate, IGeneralResponse, ICategoryWithProducts } from '../Interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${Environment.baseUrl}/Category`;

  constructor(private http: HttpClient) {}

           getAllCategories(): Observable<IGeneralResponse<ICategoryWithProducts[]>> {
           // Add headers to help with SSL certificate issues in development
           const headers = new HttpHeaders({
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           });

           return this.http.get<IGeneralResponse<ICategoryWithProducts[]>>(`${this.apiUrl}/All`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        
        // Handle SSL certificate errors specifically
        if (error && error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
          console.warn('SSL certificate error detected. This is expected in development.');
          console.warn('To resolve this, please:');
          console.warn('1. Visit https://localhost:7230 in your browser and accept the certificate');
          console.warn('2. Or configure your backend to use proper SSL certificates');
        }
        
        return of({
          success: false,
          message: 'Failed to load categories due to SSL certificate issue',
          data: []
        });
      })
    );
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
