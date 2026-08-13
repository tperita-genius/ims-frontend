import { Routes } from '@angular/router';
import { HomeComponent } from '@components/pages/home/home.component';
import { ProductManagementComponent } from '@components/pages/product-management/product-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductManagementComponent },
  { path: '**', redirectTo: 'home' }
];