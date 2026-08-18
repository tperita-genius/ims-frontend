import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserItem {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/users`;

  getUsers(search?: string): Observable<UserItem[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<UserItem[]>(this.baseUrl, { params });
  }

  toggleUserStatus(id: string, isActive: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { isActive });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}