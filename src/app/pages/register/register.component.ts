import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const registerData = {
      fullName: this.registerForm.value.fullName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = '註冊成功！即將跳轉至登入頁面...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || '註冊失敗，請稍後再試。';
      }
    });
  }
}