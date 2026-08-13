import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
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
            <!-- FontAwesome Free Solid: Bars Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-4 h-4">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM416 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
            </svg>
          </button>
        </div>

        <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
          <!-- 首頁選單 -->
          <a 
            routerLink="/home" 
            routerLinkActive="bg-indigo-600 text-white font-semibold"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition group"
          >
            <!-- FontAwesome Free Solid: House Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32v176c0 26.5-21.5 48-48 48H400c-26.5 0-48-21.5-48-48V368c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16v96c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V287.6H0c-17 0-32-14.1-32-32.1c0-9 3.5-17.6 10-24L246.2 19.4c11.5-11.5 30.1-11.5 41.6 0l268.2 212c6.5 6.4 10 15 10 24.1z"/>
            </svg>
            <span *ngIf="!isSidebarCollapsed()" class="truncate">系統首頁</span>
          </a>

          <!-- 產品管理選單 -->
          <a 
            routerLink="/products" 
            routerLinkActive="bg-indigo-600 text-white font-semibold"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition group"
          >
            <!-- FontAwesome Free Solid: Box Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" class="w-4 h-4 shrink-0">
              <path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 32V160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240zM416 224H32c-17.7 0-32 14.3-32 32V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-17.7-14.3-32-32-32zM256 368H192c-8.8 0-16-7.2-16-16s7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
            </svg>
            <span *ngIf="!isSidebarCollapsed()" class="truncate">產品管理</span>
          </a>
        </nav>

        <div class="p-4 border-t border-slate-800 text-xs text-slate-500 text-center" *ngIf="!isSidebarCollapsed()">
          &copy; 2026 Enterprise Inc.
        </div>
      </aside>

      <!-- 主要內容顯示區域 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div class="text-sm font-medium text-slate-500">
            企業後台管理平台
          </div>

          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
              User
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto p-6 md:p-8">
          <router-outlet></router-outlet>
        </main>
      </div>

    </div>
  `
})
export class AppComponent {
  isSidebarCollapsed = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarCollapsed.update(state => !state);
  }
}