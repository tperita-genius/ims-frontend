import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UserItem } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  private userService = inject(UserService);

  users: UserItem[] = [];
  isLoading = false;
  searchKeyword = '';
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers(this.searchKeyword).subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || '無法載入會員清單';
      }
    });
  }

  onSearch(event: Event): void {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.loadUsers();
  }

  onToggleStatus(user: UserItem): void {
    const newStatus = !user.isActive;
    this.userService.toggleUserStatus(user.id, newStatus).subscribe({
      next: () => {
        user.isActive = newStatus;
        this.showToast(`已成功${newStatus ? '啟用' : '停用'}會員：${user.fullName}`);
      },
      error: () => {
        alert('修改狀態失敗');
      }
    });
  }

  onDeleteUser(user: UserItem): void {
    if (!confirm(`確定要刪除會員「${user.fullName} (${user.email})」嗎？`)) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.showToast(`已成功刪除會員：${user.fullName}`);
      },
      error: (err) => {
        alert(err.error?.message || '刪除失敗（需具備 Admin 權限）');
      }
    });
  }

  private showToast(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }
}