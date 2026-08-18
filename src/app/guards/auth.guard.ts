import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 檢查是否有有效的 Token
  if (authService.getToken()) {
    return true; // 允許進入目標頁面
  }

  // 未登入，強制跳轉至登入頁
  router.navigate(['/login']);
  return false;
};