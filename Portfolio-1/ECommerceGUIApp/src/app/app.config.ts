import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS,  HttpClient,  provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorInterceptor } from './Services/auth-interceptor.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    LoginComponent,
    HomeComponent,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    
    importProvidersFrom(HttpClient), // Ensure HttpClientModule is provided,
  ],
};
