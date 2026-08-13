import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PaginatedResponse, ProductQueryParams } from '@models/product.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getProducts(params: ProductQueryParams): Observable<PaginatedResponse> {
    const queryParams: Record<string, string> = {
      page: params.page.toString(),
      limit: params.limit.toString(),
      status: params.status
    };

    if (params.search && params.search.trim()) {
      queryParams['search'] = params.search.trim();
    }

    const searchParams = new URLSearchParams(queryParams);
    return this.http.get<PaginatedResponse>(`${this.apiUrl}?${searchParams.toString()}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}