import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <span class="text-sm text-slate-500">每頁顯示：</span>
        <select 
          [value]="pageSize()" 
          (change)="onPageSizeSelect($event)"
          class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option [value]="5" [selected]="pageSize() === 5">5 筆</option>
          <option [value]="10" [selected]="pageSize() === 10">10 筆</option>
          <option [value]="20" [selected]="pageSize() === 20">20 筆</option>
          <option [value]="50" [selected]="pageSize() === 50">50 筆</option>
        </select>

        <span class="text-sm text-slate-500">
          共 <strong class="text-slate-800">{{ totalCount() }}</strong> 筆資料
        </span>
      </div>

      <div class="flex items-center space-x-4">
        <span class="text-sm text-slate-500">
          第 {{ currentPage() }} 頁，共 {{ totalPages() }} 頁
        </span>
        <div class="space-x-2">
          <button 
            [disabled]="currentPage() === 1"
            (click)="pageChange.emit(currentPage() - 1)"
            class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            上一頁
          </button>
          <button 
            [disabled]="currentPage() === totalPages() || totalPages() === 0"
            (click)="pageChange.emit(currentPage() + 1)"
            class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            下一頁
          </button>
        </div>
      </div>
    </div>
  `
})
export class PaginationComponent {
  currentPage = input<number>(1);
  pageSize = input<number>(10);
  totalCount = input<number>(0);
  totalPages = input<number>(1);

  pageChange = output<number>();
  pageSizeChange = output<number>();

  onPageSizeSelect(event: Event) {
    const val = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(val);
  }
}