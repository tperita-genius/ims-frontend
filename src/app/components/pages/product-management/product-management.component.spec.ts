import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductManagementComponent } from './product-management.component';
import { ProductService, ProductApiResponse } from '@services/product.service';

describe('ProductManagementComponent', () => {
  let component: ProductManagementComponent;
  let fixture: ComponentFixture<ProductManagementComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockResponse: ProductApiResponse = {
    totalCount: 1,
    page: 1,
    pageSize: 10,
    data: [
      { id: '1', title: '測試商品', price: 100, is_active: true, description: '說明' } as any
    ]
  };

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'createProduct',
      'updateProduct',
      'deleteProduct'
    ]);
    productServiceSpy.getProducts.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [ProductManagementComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('建立元件時應載入產品清單', () => {
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products().length).toBe(1);
    expect(component.totalCount()).toBe(1);
  });

  it('呼叫 openCreateForm 時應打開表單狀態', () => {
    component.openCreateForm();
    expect(component.isFormOpen()).toBeTrue();
    expect(component.editingProduct()).toBeNull();
  });

  it('呼叫 closeForm 時應關閉表單狀態', () => {
    component.openCreateForm();
    component.closeForm();
    expect(component.isFormOpen()).toBeFalse();
  });
});