import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '@services/product.service';
import { Product } from '@models/product.model';

import { ProductFormComponent } from '@components/product-form/product-form.component';
import { ProductSearchComponent } from '@components/product-search/product-search.component';
import { ProductTableComponent } from '@components/product-table/product-table.component';
import { PaginationComponent } from '@components/pagination/pagination.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    ProductFormComponent,
    ProductSearchComponent,
    ProductTableComponent,
    PaginationComponent
  ],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between border-b border-slate-200 pb-5">
        <div class="flex items-center gap-3">
          <!-- FontAwesome Free Solid: Box Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-6 h-6 text-indigo-600">
            <path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 32V160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240zM416 224H32c-17.7 0-32 14.3-32 32V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-17.7-14.3-32-32-32zM256 368H192c-8.8 0-16-7.2-16-16s7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
          </svg>
          <div>
            <h1 class="text-2xl font-bold text-slate-900">產品管理</h1>
            <p class="text-sm text-slate-500 mt-1">維護與檢視資料庫中的產品項目</p>
          </div>
        </div>

        @if (!isFormOpen()) {
          <button 
            (click)="openCreateForm()" 
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <!-- FontAwesome Free Solid: Plus Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-4 h-4">
              <path d="M256 80c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H56c-13.3 0-24 10.7-24 24s10.7 24 24 24H208V432c0 13.3 10.7 24 24 24s24-10.7 24-24V280H392c13.3 0 24-10.7 24-24s-10.7-24-24-24H256V80z"/>
            </svg>
            新增產品
          </button>
        }
      </div>

      @if (isFormOpen()) {
        <app-product-form
          [editingProduct]="editingProduct()"
          [submitting]="submitting()"
          (save)="onSaveProduct($event)"
          (cancel)="closeForm()"
        />
      }

      <app-product-search
        [searchTerm]="searchTerm()"
        [statusFilter]="statusFilter()"
        (searchChange)="searchTerm.set($event)"
        (statusChange)="onStatusChange($event)"
        (searchSubmit)="onSearchSubmit()"
        (clearSearch)="onClearSearch()"
      />

      <app-product-table
        [products]="products()"
        (editProduct)="onEditProduct($event)"
        (deleteProduct)="onDeleteProduct($event)"
      >
        <app-pagination
          [currentPage]="currentPage()"
          [pageSize]="pageSize()"
          [totalCount]="totalCount()"
          [totalPages]="totalPages()"
          (pageChange)="onPageChange($event)"
          (pageSizeChange)="onPageSizeChange($event)"
        />
      </app-product-table>
    </div>
  `
})
export class ProductManagementComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  submitting = signal<boolean>(false);
  editingProduct = signal<Product | null>(null);
  isFormOpen = signal<boolean>(false);

  searchTerm = signal<string>('');
  statusFilter = signal<string>('all');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalCount = signal<number>(0);

  totalPages = computed(() => {
    const total = this.totalCount();
    const size = this.pageSize();
    return total === 0 ? 1 : Math.ceil(total / size);
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts({
      page: this.currentPage(),
      limit: this.pageSize(),
      status: this.statusFilter(),
      search: this.searchTerm()
    }).subscribe({
      next: (res) => {
        this.products.set(res.data || []);
        this.totalCount.set(res.totalCount || 0);
      },
      error: (err) => {
        console.error('載入失敗:', err);
        this.products.set([]);
        this.totalCount.set(0);
      }
    });
  }

  openCreateForm() {
    this.editingProduct.set(null);
    this.isFormOpen.set(true);
  }

  closeForm() {
    this.isFormOpen.set(false);
    this.editingProduct.set(null);
  }

  onSearchSubmit() {
    this.currentPage.set(1);
    this.loadProducts();
  }

  onClearSearch() {
    this.searchTerm.set('');
    this.statusFilter.set('all');
    this.currentPage.set(1);
    this.loadProducts();
  }

  onStatusChange(status: string) {
    this.statusFilter.set(status);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProducts();
  }

  onEditProduct(product: Product) {
    this.editingProduct.set(product);
    this.isFormOpen.set(true);
  }

  onDeleteProduct(product: Product) {
    const confirmed = confirm(`警告：確定要刪除產品「${product.title}」嗎？`);
    if (!confirmed) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        if (this.editingProduct()?.id === product.id) this.closeForm();
        this.loadProducts();
      },
      error: (err) => alert('刪除失敗：' + (err.error?.detail || err.message))
    });
  }

  onSaveProduct(formData: Omit<Product, 'id'>) {
    this.submitting.set(true);
    const currentEdit = this.editingProduct();

    if (currentEdit) {
      this.productService.updateProduct(currentEdit.id, formData).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => console.error('更新失敗:', err),
        complete: () => this.submitting.set(false)
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.currentPage.set(1);
          this.loadProducts();
          this.closeForm();
        },
        error: (err) => console.error('新增失敗:', err),
        complete: () => this.submitting.set(false)
      });
    }
  }
}