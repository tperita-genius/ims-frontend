import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="flex flex-1 items-center gap-2 w-full md:w-auto">
        <div class="relative flex-1">
          <input 
            type="text" 
            [value]="searchTerm()" 
            (input)="onInput($event)"
            (keyup.enter)="searchSubmit.emit()"
            placeholder="請輸入產品名稱或描述..." 
            class="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div class="absolute left-3 top-2.5 text-slate-400">
            <!-- FontAwesome Free Solid: Magnifying Glass Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="w-4 h-4">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
          </div>
        </div>

        <button 
          type="button" 
          (click)="searchSubmit.emit()" 
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition cursor-pointer shrink-0"
        >
          搜尋
        </button>

        <button 
          type="button" 
          (click)="clearSearch.emit()" 
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition cursor-pointer shrink-0"
        >
          清除條件
        </button>
      </div>

      <div class="flex items-center space-x-3 w-full md:w-auto">
        <select 
          [value]="statusFilter()" 
          (change)="onStatusSelect($event)"
          class="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full md:w-auto"
        >
          <option value="all">全部商品</option>
          <option value="active">僅看上架</option>
          <option value="inactive">僅看下架</option>
        </select>
      </div>
    </div>
  `
})
export class ProductSearchComponent {
  searchTerm = input<string>('');
  statusFilter = input<string>('all');

  searchChange = output<string>();
  statusChange = output<string>();
  searchSubmit = output<void>();
  clearSearch = output<void>();

  onInput(event: Event) {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }

  onStatusSelect(event: Event) {
    this.statusChange.emit((event.target as HTMLSelectElement).value);
  }
}