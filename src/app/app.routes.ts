import { Routes } from '@angular/router';
import { HomeComponent } from '@components/pages/home/home.component';
import { ProductManagementComponent } from '@components/pages/product-management/product-management.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { UserManagementComponent } from '@pages/user-management/user-management.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 1. 預設進入首頁（有登入者直接進 home；未登入者會被 authGuard 自動轉至 login）
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 2. 受保護的後台路由
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductManagementComponent, canActivate: [authGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [authGuard] },

  // 3. 獨立認證頁面
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 4. 萬用路由（放最後一行）
  { path: '**', redirectTo: 'home' }
];