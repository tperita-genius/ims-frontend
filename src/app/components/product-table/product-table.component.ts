import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold uppercase text-xs">
            <tr>
              <th class="px-6 py-4">品項名稱</th>
              <th class="px-6 py-4">產品描述</th>
              <th class="px-6 py-4">價格</th>
              <th class="px-6 py-4">狀態</th>
              <th class="px-6 py-4 text-right">操作選項</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            @for (item of products(); track item.id) {
              <tr class="hover:bg-slate-50/80 transition">
                <td class="px-6 py-4 font-medium text-slate-900">{{ item.title }}</td>
                <td class="px-6 py-4 text-slate-500 max-w-xs truncate">{{ item.description || '-' }}</td>
                <td class="px-6 py-4 font-semibold text-slate-800">NT$ {{ item.price | number }}</td>
                <td class="px-6 py-4">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [ngClass]="item.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'"
                  >
                    <svg class="w-2 h-2 mr-1.5" [ngClass]="item.is_active ? 'text-emerald-500' : 'text-slate-400'" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    {{ item.is_active ? '上架中' : '已下架' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <button (click)="editProduct.emit(item)" class="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-md text-xs font-medium transition cursor-pointer">
                    <!-- FontAwesome Free Solid: Pen Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-3 h-3">
                      <path d="M410.3 231l11.3-11.3e-11 50-50c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-50 50L410.3 231zM365 276.3L160 481.3V512h30.7L395.7 307 365 276.3z"/>
                    </svg>
                    編輯
                  </button>
                  <button (click)="deleteProduct.emit(item)" class="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md text-xs font-medium transition cursor-pointer">
                    <!-- FontAwesome Free Solid: Trash Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-3 h-3">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                    刪除
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                  <p class="text-base font-medium">沒有找到符合條件的產品</p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <ng-content></ng-content>
    </div>
  `
})
export class ProductTableComponent {
  products = input<Product[]>([]);
  editProduct = output<Product>();
  deleteProduct = output<Product>();
}