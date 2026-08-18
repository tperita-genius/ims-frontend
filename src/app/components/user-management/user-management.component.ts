import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  users: User[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  // 載入會員清單
  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || '無法載入會員資料';
      }
    });
  }

  // 切換啟用/停用狀態
  onToggleStatus(user: User): void {
    const newStatus = !user.isActive;
    this.userService.toggleUserStatus(user.id, newStatus).subscribe({
      next: () => {
        user.isActive = newStatus; // 本地狀態同步更新
        this.showSuccess(`已成功${newStatus ? '啟用' : '停用'}會員：${user.fullName}`);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || '狀態更新失敗';
      }
    });
  }

  // 刪除會員
  onDeleteUser(user: User): void {
    if (!confirm(`確定要刪除會員「${user.fullName} (${user.email})」嗎？`)) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.showSuccess(`已成功刪除會員：${user.fullName}`);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || '刪除失敗';
      }
    });
  }

  // 登出
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000); // 3 秒後自動隱藏提示
  }
}