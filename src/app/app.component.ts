import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- 情況 A：非登入/註冊頁面 (渲染完整後台 Layout：SideBar + Header + 內容) -->
    <div *ngIf="!isAuthPage()" class="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
      <!-- 側邊欄 Sidebar -->
      <aside 
        class="bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 shrink-0 border-r border-slate-800"
        [ngClass]="isSidebarCollapsed() ? 'w-16' : 'w-64'"
      >
        <div class="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div *ngIf="!isSidebarCollapsed()" class="flex items-center gap-2 overflow-hidden">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              Admin
            </div>
            <span class="font-bold text-white text-base tracking-wider truncate">後台系統</span>
          </div>

          <button 
            (click)="toggleSidebar()" 
            class="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer mx-auto"
            title="切換側邊欄"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-4 h-4">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM416 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
            </svg>
          </button>
        </div>

        <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
          <a 
            routerLink="/home" 
            routerLinkActive="bg-indigo-600 text-white font-semibold"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32v176c0 26.5-21.5 48-48 48H400c-26.5 0-48-21.5-48-48V368c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16v96c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V287.6H0c-17 0-32-14.1-32-32.1c0-9 3.5-17.6 10-24L246.2 19.4c11.5-11.5 30.1-11.5 41.6 0l268.2 212c6.5 6.4 10 15 10 24.1z"/>
            </svg>
            <span *ngIf="!isSidebarCollapsed()" class="truncate">系統首頁</span>
          </a>

          <a 
            routerLink="/products" 
            routerLinkActive="bg-indigo-600 text-white font-semibold"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 32V160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240zM416 224H32c-17.7 0-32 14.3-32 32V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-17.7-14.3-32-32-32zM256 368H192c-8.8 0-16-7.2-16-16s7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
            </svg>
            <span *ngIf="!isSidebarCollapsed()" class="truncate">產品管理</span>
          </a>

          <a 
            routerLink="/user-management" 
            routerLinkActive="bg-indigo-600 text-white font-semibold"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312c0-10.7-3-20.7-8.2-29.3c27-15.9 58.7-22.7 90.2-19.3c31.5 3.5 60.5 17.5 82.2 39.8c-18.2 24.3-43.2 42.6-72.2 51.8c-29 9.2-60.2 9.2-89.2 0c2.8-14 2.8-28.5 0-42.5z"/>
            </svg>
            <span *ngIf="!isSidebarCollapsed()" class="truncate">會員管理</span>
          </a>
        </nav>

        <div class="p-4 border-t border-slate-800 text-xs text-slate-500 text-center" *ngIf="!isSidebarCollapsed()">
          &copy; 2026 Enterprise Inc.
        </div>
      </aside>

      <!-- 主要內容區域 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div class="text-sm font-medium text-slate-500">
            企業後台管理平台
          </div>

          <div class="flex items-center gap-4">
            <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              Admin
            </div>
            <button
              (click)="onLogout()"
              class="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition cursor-pointer"
            >
              登出
            </button>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto p-6 md:p-8">
          <router-outlet></router-outlet>
        </main>
      </div>

    </div>

    <!-- 情況 B：登入或註冊頁面 (獨立全螢幕展示，無側邊欄與 Header) -->
    <div *ngIf="isAuthPage()" class="h-screen w-screen overflow-hidden">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isSidebarCollapsed = signal<boolean>(false);
  isAuthPage = signal<boolean>(false);

  constructor() {
    // 依據當前 URL 即時更新是否為認證頁面
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects || event.url;
        this.isAuthPage.set(url.includes('/login') || url.includes('/register'));
      });
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(state => !state);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}