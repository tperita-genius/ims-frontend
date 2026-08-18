import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';

export interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
  role: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;

  // 使用 Signal 紀錄目前使用者狀態
  currentUser = signal<LoginResponse | null>(null);

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        // 登入成功後寫入 LocalStorage 與 Signal
        localStorage.setItem('token', res.token);
        this.currentUser.set(res);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}