import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative min-h-[85vh] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center p-8">
      <img 
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80" 
        alt="Dashboard Background" 
        class="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

      <div class="relative z-10 max-w-3xl text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          Enterprise Management System v1.0
        </div>

        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          歡迎使用企業後台管理系統
        </h1>

        <p class="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          基於 Angular 19、.NET 9 與 Supabase 建構的高效能全端管理平台。點擊左側選單進入「產品管理」頁面即可進行 CRUD 操作。
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
          <div class="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div class="text-xs text-slate-400">前端技術</div>
            <div class="text-lg font-bold text-white mt-1">Angular 19</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div class="text-xs text-slate-400">後端技術</div>
            <div class="text-lg font-bold text-white mt-1">.NET 9 Web API</div>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div class="text-xs text-slate-400">資料庫</div>
            <div class="text-lg font-bold text-white mt-1">Supabase DB</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}