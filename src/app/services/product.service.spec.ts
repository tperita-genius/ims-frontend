import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProductService, ProductApiResponse } from './product.service';
import { Product } from '@models/product.model';
import { environment } from '@environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        // Angular 18+ 新寫法，取代已淘汰的 HttpClientTestingModule
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // 確保每個測試案例結束時，沒有發出多餘且未處理的 HTTP 請求
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API via GET', () => {
    // 嚴格對應 ProductApiResponse 結構：totalCount, page, pageSize, data
    const dummyResponse: ProductApiResponse = {
      totalCount: 1,
      page: 1,
      pageSize: 10,
      data: [
        {
          id: '1',
          title: '測試商品',
          description: '這是一個測試商品',
          price: 20000,
          is_active: true
        }
      ]
    };

    // 呼叫 getProducts，因 params 是可選參數 (ProductQueryParams)，這裡不帶參數測試
    service.getProducts().subscribe((response) => {
      // 驗證陣列放在 response.data
      expect(response.data.length).toBe(1);
      // 驗證 Product 屬性 title
      expect(response.data[0].title).toBe('測試商品');
      expect(response.totalCount).toBe(1);
    });

    // 攔截符合 baseUrl 的 GET 請求
    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should retrieve products with query parameters', () => {
    const dummyResponse: ProductApiResponse = {
      totalCount: 0,
      page: 2,
      pageSize: 5,
      data: []
    };

    // 測試帶入查詢參數
    service.getProducts({ page: 2, limit: 5, status: 'active' }).subscribe((response) => {
      expect(response.page).toBe(2);
    });

    // 驗證發出的 HTTP 請求確實包含了正確的 Query String
    const req = httpMock.expectOne((request) => {
      return request.url === `${environment.apiUrl}/products` &&
             request.params.get('page') === '2' &&
             request.params.get('limit') === '5' &&
             request.params.get('status') === 'active';
    });
    
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should create a new product via POST', () => {
    // 根據 Omit<Product, 'id'>，建立新商品時不帶 id
    const newProductDto = {
      title: '新建立商品',
      description: '新商品說明',
      price: 500,
      is_active: true
    };

    // 模擬後端建立成功後，回傳包含 id 的完整 Product 物件
    const mockCreatedProduct: Product = {
      id: '2',
      title: '新建立商品',
      description: '新商品說明',
      price: 500,
      is_active: true
    };

    // 呼叫 createProduct
    service.createProduct(newProductDto).subscribe((response) => {
      expect(response.title).toBe('新建立商品');
      expect(response.id).toBe('2');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCreatedProduct);
  });
});