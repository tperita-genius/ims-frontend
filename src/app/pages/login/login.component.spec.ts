import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // 如果 Component 有注入 Router，必須加這行提供空的路由陣列
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('當表單為空並按下送出時，輸入框應顯示紅色邊框 (border-red-500)', () => {
  // 1. Arrange: 確認初始狀態，輸入框沒有紅框
  const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
  expect(emailInput.classList.contains('border-red-500')).toBeFalse();

  // 2. Act: 點擊按鈕
  const submitButton = fixture.debugElement.query(By.css('#submit-btn'));
  submitButton.nativeElement.click();
  fixture.detectChanges();

  // 3. Assert: 驗證 class 是否有正確掛上去
  expect(emailInput.classList.contains('border-red-500')).toBeTrue();
});
});
