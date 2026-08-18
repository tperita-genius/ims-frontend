import { Routes } from '@angular/router';
import { HomeComponent } from '@components/pages/home/home.component';
import { ProductManagementComponent } from '@components/pages/product-management/product-management.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { UserManagementComponent } from '@pages/user-management/user-management.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 需受登入保護的頁面
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'products',
    component: ProductManagementComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [authGuard]
  },

  // 公開頁面 (無需保護)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];