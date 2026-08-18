import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. 從 AuthService 取得儲存的 JWT Token
  const token = authService.getToken();

  // 2. 若 Token 存在，複製 Request 並加入 Authorization Header
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 3. 發送請求並透過 catchError 處理 HTTP 錯誤
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 當後端回傳 401 Unauthorized (Token 過期、無效或未提供)
      if (error.status === 401) {
        // 清除 LocalStorage 中的 Token 與使用者狀態
        authService.logout();
        
        // 自動重導向回登入頁面
        router.navigate(['/login']);
      }

      // 將錯誤繼續拋出，讓 Component 的 error handler 亦可捕捉
      return throwError(() => error);
    })
  );
};