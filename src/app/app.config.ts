import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { authInterceptorProviders, AuthInterceptorService } from './Services/auth-interceptor.service';
import { HomeComponent } from './home-component/home-component.component';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(HttpClientModule), // Ensure HttpClientModule is provided,
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
};
