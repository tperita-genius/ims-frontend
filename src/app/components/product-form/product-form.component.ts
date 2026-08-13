import { Component, inject, input, output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-xl shadow-md border border-indigo-100 p-6 transition-all duration-300">
      <div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
          @if (editingProduct()) {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-indigo-600">
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-indigo-600">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          }
          {{ editingProduct() ? '編輯產品' : '新增產品' }}
        </h3>
        
        <div class="flex items-center gap-2">
          @if (editingProduct()) {
            <span class="text-xs bg-amber-100 text-amber-800 font-medium px-2.5 py-1 rounded-full">編輯模式</span>
          }
          <button (click)="cancel.emit()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer" title="收起表單">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
      
      <form [formGroup]="productForm" (ngSubmit)="handleSubmit()" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">產品名稱 <span class="text-rose-500">*</span></label>
            <input type="text" formControlName="title" placeholder="請輸入產品名稱" class="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">價格 (NT$) <span class="text-rose-500">*</span></label>
            <input type="number" formControlName="price" class="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">產品描述</label>
          <textarea formControlName="description" rows="2" placeholder="請輸入簡短描述" class="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"></textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" formControlName="is_active" class="sr-only peer" />
            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 relative"></div>
            <span class="ml-3 text-sm font-medium text-slate-700">商品狀態：{{ productForm.value.is_active ? '上架中' : '已下架' }}</span>
          </label>

          <div class="flex space-x-3">
            <button type="button" (click)="cancel.emit()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition cursor-pointer">
              取消/收起
            </button>
            <button type="submit" [disabled]="productForm.invalid || submitting()" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium shadow-sm transition cursor-pointer">
              {{ submitting() ? '處理中...' : (editingProduct() ? '更新產品' : '確認新增') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class ProductFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  // Inputs & Outputs
  editingProduct = input<Product | null>(null);
  submitting = input<boolean>(false);
  save = output<Omit<Product, 'id'>>();
  cancel = output<void>();

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    is_active: [true]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingProduct']) {
      const prod = this.editingProduct();
      if (prod) {
        this.productForm.patchValue({
          title: prod.title,
          description: prod.description,
          price: prod.price,
          is_active: prod.is_active
        });
      } else {
        this.productForm.reset({ title: '', description: '', price: 0, is_active: true });
      }
    }
  }

  handleSubmit() {
    if (this.productForm.invalid) return;
    this.save.emit(this.productForm.value as Omit<Product, 'id'>);
  }
}