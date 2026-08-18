import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
// 1. 加入 import
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        // 2. 提供所需依賴
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // 這個可以解決 No provider for ActivatedRoute!
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // 3. 確保底下沒有包含 expect(app.title) 或是 expect(compiled.querySelector('.content span')?.textContent) 的測試案例
});