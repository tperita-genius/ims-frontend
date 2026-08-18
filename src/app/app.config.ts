import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),     // 必須有這一行來提供 Router 與 ActivatedRoute 的服務
    provideHttpClient(),        // 確保 HttpClient 服務也持續生效
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};